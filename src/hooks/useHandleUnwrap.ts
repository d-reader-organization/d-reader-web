'use client'

import { useRouter } from 'next/navigation'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { sleep } from '@/utils/helpers'
import { confirmingTransaction, toast } from '@/components/ui/toast/use-toast'
import { fetchUseComicIssueAssetTransaction } from '@/app/lib/api/transaction/queries'
import { useState } from 'react'
import { CollectibleComic } from '@/models/asset'
import { useAuthStore } from '@/providers/AuthStoreProvider'

type ReturnType = {
  handleUnwrap: () => Promise<void>
  isUnwrapLoading: boolean
}

export const useHandleUnwrap = ({
  collectibleComic,
  onSuccess,
}: {
  collectibleComic: CollectibleComic
  onSuccess: () => void
}): ReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refresh } = useRouter()
  const { signTransaction } = useWallet()
  const { connection } = useConnection()
  const accessToken = useAuthStore((state) => state.accessToken)

  const handleUnwrap = async () => {
    try {
      setIsLoading(true)
      const unwrapTransaction = await fetchUseComicIssueAssetTransaction({
        accessToken,
        params: { assetAddress: collectibleComic.address, ownerAddress: collectibleComic.ownerAddress },
      })
      if (unwrapTransaction) {
        if (!signTransaction) return
        const latestBlockhash = await connection.getLatestBlockhash()
        const signedTransaction = await signTransaction(unwrapTransaction)
        confirmingTransaction()
        const signature = await connection.sendRawTransaction(signedTransaction.serialize())
        const response = await connection.confirmTransaction({ signature, ...latestBlockhash })
        if (!!response.value.err) {
          console.log('Response error log: ', response.value.err)
          toast({
            description: 'Error while unwrapping the comic',
            variant: 'error',
          })
          throw Error()
        }
        await sleep(1000)
      }

      toast({
        description: 'Comic unwrapped! Lets get to reading 🎉',
        variant: 'success',
      })
      refresh()
    } catch (e) {
      console.error('Error while unwrapping the comic', e)
    } finally {
      setIsLoading(false)
      onSuccess()
    }
  }

  return {
    handleUnwrap,
    isUnwrapLoading: isLoading,
  }
}
