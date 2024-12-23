'use client'

import { checkIfCouponIsActive, getMintPrice, validateMintEligibilty } from '@/utils/mint'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/Button'
import { Loader } from '../Loader'
import { AssetMintedDialog } from '../dialogs/AssetMintedDialog'
import { ComicIssue } from '@/models/comicIssue'
import { ConfirmingTransactionDialog } from '../dialogs/ConfirmingTransactionDialog'
import { useToggle } from '@/hooks'
import { toast } from '../../ui/toast'
import { fetchMintTransaction } from '@/app/lib/api/transaction/queries'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { io, Socket } from 'socket.io-client'
import { sendMintTransaction } from '@/app/lib/api/transaction/mutations'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { VersionedTransaction } from '@solana/web3.js'
import Image from 'next/image'
import { AssetMintEvent } from '@/models/asset/assetMintEvent'
import { ConnectButton } from './ConnectButton'
import { cn } from '@/lib/utils'

type Props = {
  accessToken: string
  comicIssue: ComicIssue
  isAuthenticated: boolean
  bounce?: boolean
  onMint?: VoidFunction
}

export const MintButton: React.FC<Props> = ({ accessToken, comicIssue, isAuthenticated, bounce = false, onMint }) => {
  const { candyMachine, selectedCoupon, numberOfItems, selectedCurrency, supportedTokens, refetchCandyMachine } =
    useCandyMachineStore((state) => state)
  const [showAssetMinted, toggleAssetMinted] = useToggle()
  // const [showEmailVerification, toggleEmailVerification] = useToggle()
  // const [showWalletNotConnected, toggleWalletNotConnected] = useToggle()
  const [showConfirmingTransaction, toggleConfirmingTransaction, closeConfirmingTransaction] = useToggle()
  const [isMintTransactionLoading, setIsMintTransactionLoading] = useState(false)
  const [assetMintEventData, setAssetMintEventData] = useState<AssetMintEvent>()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [socketInstance, setSocket] = useState<Socket | null>()

  const { publicKey, signAllTransactions } = useWallet()

  const walletAddress = publicKey?.toBase58()
  const hasWalletConnected = !!walletAddress

  const { isEligible } = validateMintEligibilty(candyMachine?.coupons ?? [], selectedCoupon?.id)
  const isLive = selectedCoupon ? checkIfCouponIsActive(selectedCoupon) : false

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT || '')
    setSocket(socket)

    return () => {
      setSocket(null)
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!walletAddress || !socketInstance) return
    socketInstance.emit('join-room', { walletAddress })

    return () => {
      socketInstance.emit('leave-room', { walletAddress })
    }
  }, [walletAddress, socketInstance])

  useEffect(() => {
    if (!walletAddress || !socketInstance) {
      return
    }

    socketInstance.on(`wallet/${walletAddress}/item-minted`, async (assetEventData: AssetMintEvent): Promise<void> => {
      clearTimeout(timeoutId)
      setAssetMintEventData(assetEventData)
      closeConfirmingTransaction()
      setTimeoutId(undefined)
      toggleAssetMinted()
      toast({ description: 'Successfully minted the comic! Find the asset in your wallet', variant: 'success' })
    })

    return () => {
      socketInstance.off(`wallet/${walletAddress}/item-minted`)
    }
  }, [walletAddress, timeoutId, closeConfirmingTransaction, toggleAssetMinted, socketInstance])

  const handleMint = async () => {
    if (typeof onMint === 'function') onMint()
    if (!walletAddress || !selectedCurrency) return
    setIsMintTransactionLoading(true)

    // figure out what about this
    const updatedCandyMachine = await refetchCandyMachine()
    if (!updatedCandyMachine || !selectedCoupon) {
      setIsMintTransactionLoading(false)
      return
    }

    const isMintValid = validateMintEligibilty(updatedCandyMachine?.coupons, selectedCoupon.id)
    if (!isMintValid) {
      toast({ description: "You're not eligible for the mint", variant: 'error' })
    }

    let mintTransactions: VersionedTransaction[] = []
    try {
      const { data: transactions, error } = await fetchMintTransaction({
        accessToken,
        params: {
          candyMachineAddress: updatedCandyMachine.address,
          minterAddress: walletAddress,
          couponId: selectedCoupon.id,
          label: selectedCurrency.label,
          numberOfItems: numberOfItems ?? 1,
        },
      })

      if (error) {
        setIsMintTransactionLoading(false)
        toast({ description: error, variant: 'error' })
        return
      }

      if (!transactions || !transactions.length) {
        throw new Error()
      }

      mintTransactions = transactions.map(versionedTransactionFromBs64)
    } catch (error) {
      console.error(error)
      setIsMintTransactionLoading(false)
      toast({ description: error instanceof Error ? error.message : 'An unknown error occurred', variant: 'error' })
    }

    if (!mintTransactions.length) return

    if (!signAllTransactions) {
      return toast({ description: 'Wallet does not support signing multiple transactions', variant: 'error' })
    }

    try {
      const signedTransactions = await signAllTransactions(mintTransactions)
      setIsMintTransactionLoading(false)
      toggleConfirmingTransaction()

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const id = setTimeout(async () => {
        closeConfirmingTransaction()
        toast({
          description: 'Network might be congested, your transaction might have failed. Please check your wallet',
          variant: 'error',
        })
        setTimeoutId(undefined)
        await refetchCandyMachine()
      }, 30 * 1000)
      setTimeoutId(id)

      const serializedTransactions: string[] = []
      for (const transaction of signedTransactions) {
        try {
          const serializedTransaction = Buffer.from(transaction.serialize()).toString('base64')
          serializedTransactions.push(serializedTransaction)
        } catch (e) {
          clearTimeout(timeoutId)
          setIsMintTransactionLoading(false)
          closeConfirmingTransaction()
          toast({
            description: 'Something went wrong',
            variant: 'error',
          })
        }
      }
      await sendMintTransaction(walletAddress, serializedTransactions)
    } catch (e) {
      console.log(e)
      clearTimeout(timeoutId)
      setIsMintTransactionLoading(false)
      closeConfirmingTransaction()
    }
  }

  const mintPrice =
    selectedCoupon?.prices.find((price) => {
      return price.splTokenAddress === selectedCurrency?.splTokenAddress
    })?.mintPrice ?? 0
  const splToken = supportedTokens?.find((token) => token.address === selectedCurrency?.splTokenAddress)

  const price = getMintPrice(mintPrice * numberOfItems, splToken?.decimals ?? 1)
  const isFree = price == 0

  return (
    <>
      {hasWalletConnected ? (
        isEligible ? (
          <Button
            className={cn('bg-important-color min-h-[52px] w-full', bounce && 'animate-bounce')}
            disabled={!isLive}
            aria-disabled={!isLive}
            onClick={handleMint}
          >
            {!isMintTransactionLoading ? (
              <div className='flex items-center gap-1.5 text-base font-bold leading-[22.4px]'>
                {isFree ? (
                  <span>Claim for free</span>
                ) : (
                  <>
                    <span>Purchase</span>
                    <Image
                      alt={splToken?.name || 'currency'}
                      src={splToken?.icon ?? splToken?.symbol ?? ''}
                      width={14}
                      height={14}
                      className='h-3.5 w-3.5'
                    />
                    <span>{price}</span>
                  </>
                )}
              </div>
            ) : (
              <Loader />
            )}
          </Button>
        ) : (
          <>
            <Button className='min-h-[52px] w-full' disabled>
              Not eligible
            </Button>
          </>
        )
      ) : (
        <ConnectButton
          disabled={!isLive}
          aria-disabled={!isLive}
          variant='primary'
          subVariant={1}
          size='lg'
          className='w-full max-md:w-[150px]'
          text='Connect'
        />
      )}
      {assetMintEventData ? (
        <AssetMintedDialog
          accessToken={accessToken}
          assets={assetMintEventData.assets}
          comicIssue={comicIssue}
          isAuthenticated={isAuthenticated}
          open={showAssetMinted}
          toggleDialog={async () => {
            await refetchCandyMachine().then(() => toggleAssetMinted())
          }}
        />
      ) : null}
      <ConfirmingTransactionDialog open={showConfirmingTransaction} toggleDialog={toggleConfirmingTransaction} />
    </>
  )
}
