'use client'

import React from 'react'
import { ComicIssue } from '@/models/comicIssue'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { CandyMachineDetails } from '../shared/CandyMachineDetails'
import { useLocalStorage, useToggle } from '@/hooks'
import { LOCAL_STORAGE } from '@/constants/general'

type Props = {
  comicIssue: ComicIssue
}

export const CandyMachineClaimDetails: React.FC<Props> = ({ comicIssue }) => {
  const [isDialogRead, setIsDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_CLAIM_WALKTHROUGH_COMPELETE, false)
  const [showBouncingPurchaseButton, , closeBouncingPurchaseButton] = useToggle(!isDialogRead)

  const onMint = () => {
    closeBouncingPurchaseButton()
    setIsDialogRead(true)
  }

  return (
    <CandyMachineStoreProvider comicIssue={comicIssue}>
      <CandyMachineDetails comicIssue={comicIssue} bounce={showBouncingPurchaseButton} onMint={onMint} />
    </CandyMachineStoreProvider>
  )
}
