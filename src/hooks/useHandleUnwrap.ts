'use client'

import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/toast/use-toast'
import { useState } from 'react'
import { useAuthStore } from '@/providers/AuthStoreProvider'
import { unwrapComicIssueAsset } from '@/app/lib/api/transaction/mutations'

type ReturnType = {
  handleUnwrap: () => Promise<void>
  isUnwrapLoading: boolean
}

export const useHandleUnwrap = ({
  collectibleComicAddress,
  onSuccess,
}: {
  collectibleComicAddress: string
  onSuccess: () => void
}): ReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refresh } = useRouter()
  const accessToken = useAuthStore((state) => state.accessToken)

  const handleUnwrap = async () => {
    try {
      setIsLoading(true)
      const response = await unwrapComicIssueAsset({
        accessToken,
        params: { assetAddress: collectibleComicAddress },
      })

      if (response.errorMessage) {
        toast({ description: response.errorMessage, variant: 'error' })
      } else {
        toast({ description: 'Comic unwrapped! Lets get to reading 🎉', variant: 'success' })
        refresh()
      }
    } catch (e) {
      console.log(e)
      toast({ description: 'Failed to unwrap, please try again!', variant: 'error' })
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
