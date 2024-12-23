import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import {
  type SignMessageResult,
  type Configs,
  type EmailLoginResult,
  type Error,
  type SocialLoginResult,
  type SignTransactionResult,
  ChallengeType,
  SocialLoginProvider,
} from '@circle-fin/w3s-pw-web-sdk/dist/src/types'
import { toast } from '@/components/ui'
import {
  deviceIdKey,
  deviceTokenEncryptionKey,
  deviceTokenKey,
  otpTokenKey,
  userEncryptionKey,
  userTokenKey,
} from '@/constants/circle'
import {
  type Wallet,
  type DeviceTokenEmailData,
} from '@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets'
import {
  createUserForLoginWithEmail,
  createUserForSocialLogin,
  createUserWallet,
  getUserWallets,
  signMessage,
  signTransaction,
} from '@/app/lib/actions/circle'
import { connectUserWallet, requestWalletPassword } from '@/app/lib/api/auth/mutations'
import { fetchMintTransaction } from '@/app/lib/api/transaction/queries'
import { SignedDataType } from '@/models/wallet/connectWallet'
import { shortenSolanaAddress } from '@/utils/helpers'
import bs58 from 'bs58'
import { io } from 'socket.io-client'
import { sendMintTransaction } from '@/app/lib/api/transaction/mutations'
import { AssetMintEvent } from '@/models/asset/assetMintEvent'
import { fetchMe } from '@/app/lib/api/user/queries'

let webSdk: W3SSdk

type ContextReturnType = {
  deviceId?: string
  executeChallenge?: (challengeId: string) => void
  userToken?: string
  activeWallet?: Wallet
  onLogin?: () => Promise<void>
  onGoogleLogin?: () => Promise<void>
  createWalletAction?: () => Promise<void>
  requestAndSignMessage?: (input: { address: string; walletId: string }) => Promise<void>
  fetchAndSignTransaction?: (input: { address: string; walletId: string }) => Promise<void>
}

const CircleSdk = createContext<ContextReturnType>({})

const getConfig = (): Configs => ({
  appSettings: { appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID || '' },
  authentication: {
    encryptionKey: localStorage.getItem(userEncryptionKey) ?? '',
    userToken: localStorage.getItem(userTokenKey) ?? '',
  },
  loginConfigs: {
    deviceToken: localStorage.getItem(deviceTokenKey) ?? '',
    deviceEncryptionKey: localStorage.getItem(deviceTokenEncryptionKey) ?? '',
    otpToken: localStorage.getItem(otpTokenKey) ?? '',
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID ?? '',
      redirectUri: `${window.location.origin}/circle`,
    },
  },
})

const initializeW3Sdk = (
  onLoginComplete: (error: Error | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => void
) => {
  return new W3SSdk(getConfig(), onLoginComplete)
}

export const useCircleSdk = () => useContext(CircleSdk)

function hexToBase58(hexString: string) {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  const buffer = Buffer.from(hexString, 'hex')
  return bs58.encode(buffer)
}

export const CircleSdkProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [deviceId, setDeviceId] = useState<string>()
  const [userToken, setUserToken] = useState<string>()
  const [encryptionKey, setEncryptionKey] = useState<string>()
  const [isMintTransactionLoading, setIsMintTransactionLoading] = useState<boolean>(false)
  const [activeWallet, setActiveWallet] = useState<Wallet>()

  useEffect(() => {
    const walletAddress = activeWallet?.address
    if (!walletAddress && !isMintTransactionLoading) {
      return
    }
    const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT || '')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on(`wallet/${walletAddress}/item-minted`, async (_assetEventData: AssetMintEvent): Promise<void> => {
      setIsMintTransactionLoading(false)
      toast({ description: 'Purchase successful! Find the asset(s) in your wallet', variant: 'success' })
    })

    return () => {
      socket.off(`wallet/${walletAddress}/item-minted`)
      socket.disconnect()
    }
  }, [activeWallet, isMintTransactionLoading])

  const getAndSetActiveWallet = async (userToken: string) => {
    const response = await getUserWallets(userToken)
    setActiveWallet(response?.wallets.at(0))
  }

  const connectWalletApi = useCallback(
    async (encoding: string): Promise<void> => {
      if (!activeWallet) {
        return
      }

      const response = await connectUserWallet({
        address: activeWallet.address,
        encoding,
        signedDataType: SignedDataType.Message,
      })
      toast({
        title: !!response.errorMessage ? 'Error' : 'Success',
        description:
          response.errorMessage ??
          `Wallet ${shortenSolanaAddress({ address: activeWallet.address, slice: 3 })} connected!`,
        variant: !!response.errorMessage ? 'error' : 'success',
      })
    },
    [activeWallet]
  )

  const sendTransactionApi = useCallback(
    async (signature: string) => {
      if (!activeWallet) {
        return
      }
      const error = await sendMintTransaction(activeWallet.address, [signature])
      if (!error) {
        setIsMintTransactionLoading(true)
        return
      }
      toast({
        title: 'Error',
        description: error ?? 'Failed to send transaction',
        variant: 'error',
      })
    },
    [activeWallet]
  )

  const executeChallenge = useCallback(
    (challengeId: string) => {
      if (!webSdk) {
        toast({ title: 'Circle SDK is not initialized properly', description: 'Something is wrong', variant: 'error' })
        return
      }

      webSdk.execute(challengeId, async (error, result) => {
        if (error) {
          console.error(error)
          return
        }

        if (result?.type === ChallengeType.SIGN_MESSAGE) {
          const signMessageResult = result as SignMessageResult
          await connectWalletApi(hexToBase58(signMessageResult.data?.signature ?? ''))
        } else if (result?.type === ChallengeType.SIGN_TRANSACTION) {
          const signTransactionResult = result as SignTransactionResult
          await sendTransactionApi(signTransactionResult.data?.signedTransaction ?? '')
        } else if (result?.type === ChallengeType.CREATE_WALLET || result?.type === ChallengeType.INITIALIZE) {
          await getAndSetActiveWallet(userToken ?? '')
        }
      })
    },
    [connectWalletApi, sendTransactionApi, userToken]
  )

  const setUserDeviceId = useCallback((newDeviceId: string) => {
    localStorage.setItem(deviceIdKey, newDeviceId)
    setDeviceId(newDeviceId)
  }, [])

  const storeDeviceTokenData = useCallback((data: DeviceTokenEmailData) => {
    localStorage.setItem(deviceTokenKey, data.deviceToken)
    localStorage.setItem(deviceTokenEncryptionKey, data.deviceEncryptionKey ?? '')
  }, [])

  const afterLoginComplete = async (result: SocialLoginResult | EmailLoginResult | undefined) => {
    localStorage.setItem(userTokenKey, result?.userToken ?? '')
    localStorage.setItem(userEncryptionKey, result?.encryptionKey ?? '')
    setUserToken(result?.userToken)
    setEncryptionKey(result?.encryptionKey)
  }

  const onLoginComplete = useCallback(
    async (error: Error | undefined, result: SocialLoginResult | EmailLoginResult | undefined) => {
      if (error) {
        console.error(error)
        toast({ title: 'Error', description: 'Circle error', variant: 'error' })
        return
      }
      await afterLoginComplete(result)
    },
    []
  )

  const onGoogleLogin = useCallback(async () => {
    if (!webSdk) {
      return
    }
    const deviceId = await webSdk.getDeviceId()
    const response = await createUserForSocialLogin(deviceId)
    if (!response) {
      return
    }
    setUserDeviceId(deviceId)
    storeDeviceTokenData(response)
    webSdk.performLogin(SocialLoginProvider.GOOGLE)
  }, [setUserDeviceId, storeDeviceTokenData])

  const onLogin = useCallback(async () => {
    if (!webSdk) {
      return
    }
    const deviceId = await webSdk.getDeviceId()
    const response = await createUserForLoginWithEmail({ deviceId, email: (await fetchMe())?.email ?? '' })
    if (!response) {
      return
    }
    setUserDeviceId(deviceId)
    storeDeviceTokenData(response)
    webSdk.updateConfigs({
      appSettings: { appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID || '' },
      loginConfigs: {
        deviceToken: response.deviceToken,
        deviceEncryptionKey: response.deviceEncryptionKey ?? '',
        otpToken: response.otpToken,
      },
    })
    webSdk.verifyOtp()
  }, [setUserDeviceId, storeDeviceTokenData])

  const createWalletAction = useCallback(async () => {
    if (!userToken) {
      return
    }
    const response = await createUserWallet(userToken)
    if (response?.errorMessage) {
      toast({
        description: response?.errorMessage,
        variant: 'error',
      })
      return
    }
    executeChallenge?.(response?.challengeId ?? '')
  }, [executeChallenge, userToken])

  const requestAndSignMessage = useCallback(
    async ({ address, walletId }: { address: string; walletId: string }) => {
      if (!userToken) {
        return
      }
      const otp = await requestWalletPassword(address)
      const response = await signMessage({ message: otp, userToken, walletId })
      executeChallenge?.(response?.challengeId ?? '')
    },
    [executeChallenge, userToken]
  )

  const fetchAndSignTransaction = useCallback(
    async ({ address, walletId }: { address: string; walletId: string }) => {
      if (!userToken) {
        return
      }
      const candyMachineAddress = '27oc77myssfnduDTJngFNrLSxpNXuyksUUPHSUKQEX5P'
      const couponId = 29
      const label = 'ru0-1'
      const transaction = await fetchMintTransaction({
        accessToken: '',
        params: { candyMachineAddress, couponId, label, minterAddress: address, numberOfItems: 1 },
      })

      if (transaction.error) {
        toast({
          description: transaction.error,
          variant: 'error',
        })
      }
      const response = await signTransaction({
        rawTransaction: transaction.data.at(0) ?? '',
        userToken,
        walletAddress: address,
        walletId,
      })
      executeChallenge?.(response?.challengeId ?? '')
    },
    [executeChallenge, userToken]
  )

  useEffect(() => {
    if (!userToken) {
      return
    }
    getAndSetActiveWallet(userToken)
    if (encryptionKey && webSdk) {
      webSdk.setAuthentication({
        encryptionKey,
        userToken,
      })
    }
  }, [userToken, encryptionKey])

  useEffect(() => {
    webSdk = initializeW3Sdk(onLoginComplete)

    if (webSdk) {
      setDeviceId(localStorage.getItem(deviceIdKey) ?? '')
      setUserToken(localStorage.getItem(userTokenKey) ?? '')
    }
  }, [onLoginComplete])

  const contextValues = useMemo(
    (): ContextReturnType => ({
      deviceId,
      activeWallet,
      executeChallenge,
      userToken,
      onLogin,
      onGoogleLogin,
      createWalletAction,
      requestAndSignMessage,
      fetchAndSignTransaction,
    }),
    [
      deviceId,
      executeChallenge,
      userToken,
      onLogin,
      onGoogleLogin,
      createWalletAction,
      requestAndSignMessage,
      fetchAndSignTransaction,
      activeWallet,
    ]
  )

  return <CircleSdk.Provider value={contextValues}>{children}</CircleSdk.Provider>
}
