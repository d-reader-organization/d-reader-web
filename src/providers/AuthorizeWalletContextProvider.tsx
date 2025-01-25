import { ReactNode, useContext, createContext, useCallback, useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useConnectUserWallet } from '@/api/auth/queries/useConnectUserWallet'
import { Transaction, PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { LEDGER_ADAPTERS } from '@/constants/general'
import { MEMO_PROGRAM_ID } from '@/constants/general'
import { SignedDataType } from '@/models/wallet/connectWallet'
import { toast } from '@/components/ui'
import { requestWalletPassword } from '@/app/lib/api/auth/mutations'
import { fetchMe, fetchUserWallets } from '@/app/lib/api/user/queries'

interface AuthorizeWalletContextType {
  authorizeWallet: (callback?: VoidFunction) => Promise<void>
  isAuthorizing: boolean
  hasWalletConnected: boolean
}

const AuthorizeWalletContext = createContext<AuthorizeWalletContextType | undefined>(undefined)

export function AuthorizeWalletProvider({ children }: { children: ReactNode }) {
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false)
  const [hasWalletConnected, setHasWalletConnected] = useState<boolean>(false)
  const { wallet, publicKey, signMessage, signTransaction } = useWallet()
  const { connection } = useConnection()

  const { mutateAsync: connectUserWallet } = useConnectUserWallet()

  const authorizeWallet = useCallback(
    async (callback?: VoidFunction) => {
      const me = await fetchMe()
      if (!me) {
        return
      }
      const walletAddress = publicKey?.toBase58()
      const connectedWallets = await fetchUserWallets(me.id)
      const connectedWalletAddresses = connectedWallets.map((wallet) => wallet.address)
      const hasWalletConnected = !!walletAddress && connectedWalletAddresses.includes(walletAddress)
      setHasWalletConnected(hasWalletConnected)
      if (!publicKey || hasWalletConnected || !wallet || !signMessage || !signTransaction) {
        return
      }
      setIsAuthorizing(true)

      try {
        const address = publicKey.toBase58()
        const otp = await requestWalletPassword(address)
        const walletName = wallet.adapter.name

        let encoding = ''
        let type: SignedDataType
        if (
          signTransaction &&
          (walletName === LEDGER_ADAPTERS.PHANTOM.NAME || walletName === LEDGER_ADAPTERS.SOLFLARE.NAME)
        ) {
          const keypair = Keypair.generate()
          const instruction = new TransactionInstruction({
            keys: [
              { isSigner: true, isWritable: false, pubkey: publicKey },
              { isSigner: true, isWritable: false, pubkey: keypair.publicKey },
              { isSigner: true, isWritable: false, pubkey: PublicKey.default },
            ],
            programId: MEMO_PROGRAM_ID,
            data: Buffer.from(otp, 'utf8'),
          })

          const latestBlockHash = await connection.getLatestBlockhash()
          const transaction = new Transaction({ feePayer: publicKey, ...latestBlockHash }).add(instruction)
          transaction.partialSign(keypair)

          const signedTransaction = await signTransaction(transaction)
          encoding = signedTransaction.serialize({ requireAllSignatures: false }).toString('base64')
          type = SignedDataType.Transaction
        } else if (signMessage) {
          const message = new TextEncoder().encode(otp)
          const signedMessage = await signMessage(message)
          encoding = bs58.encode(signedMessage)
          type = SignedDataType.Message
        } else {
          throw new Error('Wallet does not support message or transaction signing!')
        }

        const { errorMessage } = await connectUserWallet({ address, encoding, signedDataType: type })

        if (errorMessage) {
          return
        }

        if (typeof callback === 'function') callback()
      } catch (_) {
        toast({ description: `Authorization failed`, variant: 'error' })
      } finally {
        setIsAuthorizing(false)
      }
    },
    [wallet, publicKey, signMessage, signTransaction, connectUserWallet, connection]
  )

  const value = {
    authorizeWallet,
    isAuthorizing,
    hasWalletConnected,
  }

  useEffect(() => {
    if (!isAuthorizing) {
      authorizeWallet()
    }
    // TODO: I've included the 'isAuthorizing' flag in the dependency array bcs of the linter error
    // I hope it won't cause any unwanted side effects
  }, [authorizeWallet, isAuthorizing])

  return <AuthorizeWalletContext.Provider value={value}>{children}</AuthorizeWalletContext.Provider>
}

export function useAuthorizeWalletContext() {
  const context = useContext(AuthorizeWalletContext)
  if (!context) {
    throw new Error('useAuthorizeWalletContext must be used within AuthorizeWalletProvider')
  }
  return context
}
