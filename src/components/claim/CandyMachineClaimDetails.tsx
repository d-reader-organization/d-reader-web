'use client'

import React from 'react'
import { ComicIssue } from '@/models/comicIssue'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { CandyMachineDetails } from '../shared/CandyMachineDetails'
import { useLocalStorage, useToggle } from '@/hooks'
import { LOCAL_STORAGE } from '@/constants/general'

type Props = {
  accessToken: string
  comicIssue: ComicIssue
  isAuthenticated: boolean
}

export const CandyMachineClaimDetails: React.FC<Props> = ({ accessToken, comicIssue, isAuthenticated }) => {
  const [isDialogRead, setIsDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_CLAIM_WALKTHROUGH_COMPELETE, false)
  const [showBouncingPurchaseButton, , closeBouncingPurchaseButton] = useToggle(!isDialogRead)

  const onMint = () => {
    closeBouncingPurchaseButton()
    setIsDialogRead(true)
  }

  return (
    <CandyMachineStoreProvider comicIssue={comicIssue} accessToken={accessToken}>
      <CandyMachineDetails
        accessToken={accessToken}
        comicIssue={comicIssue}
        isAuthenticated={isAuthenticated}
        bounce={showBouncingPurchaseButton}
        onMint={onMint}
      />
    </CandyMachineStoreProvider>
  )
}
