'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import { Button, toast } from '@/components/ui'
import { useLocalStorage, useToggle } from '@/hooks'
import { Text } from '@/components/ui'
import { LOCAL_STORAGE } from '@/constants/general'
import { useWallet } from '@solana/wallet-adapter-react'
import { GoogleViaTipLinkWalletName } from '@tiplink/wallet-adapter'

export const ClaimPageHintDialog: React.FC = () => {
  const { select } = useWallet()
  const [isDialogRead, setIsDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_CLAIM_HINT_READ, false)
  const [claimHintDialog, toggleClaimHintDialog] = useToggle(!isDialogRead)

  const onClick = async () => {
    select(GoogleViaTipLinkWalletName)
    try {
      toggleClaimHintDialog()
      setIsDialogRead(true)
    } catch (_) {
      toast({ description: 'failed to connect wallet, try again!', variant: 'error' })
    }
  }

  return (
    <Dialog open={claimHintDialog} onOpenChange={toggleClaimHintDialog}>
      <DialogContent className='max-w-md' hideCloseIcon>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Welcome to dReader!
            </Text>
          </DialogTitle>
          <DialogDescription className='text-left'>
            <div className='rounded-xl bg-grey-400 flex flex-col'>
              <div className='p-4 gap-4 flex'>
                <div className='size-5'>▶️</div>
                <div className='inline-block gap-2 w-full'>
                  <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                    Watch the video!
                  </Text>
                </div>
              </div>
              <div className='pl-4 pr-4 pb-4'>
                <iframe
                  src='https://www.youtube.com/embed/og1LPg7bt7o'
                  className='w-full h-auto aspect-video rounded-md'
                />
              </div>
            </div>
            <div className='rounded-xl bg-grey-400 p-4 gap-4 flex'>
              <div className='size-5'>📚</div>
              <div className='inline-block gap-2 w-full'>
                <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                  Digital collectibles
                </Text>
                <Text
                  as='p'
                  styleVariant='body-small'
                  fontWeight='medium'
                  className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
                >
                  Comics you collect are stored in your digital wallet!
                </Text>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Button variant='white' className='w-full' onClick={onClick}>
          I understand!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
