'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
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
      <DialogContent
        aria-describedby=''
        className='max-w-[485px] rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-4'
        showCloseIcon={false}
      >
        <DialogTitle className='font-satoshi leading-[24px] text-xl'>Welcome to dReader!</DialogTitle>
        <div className='flex flex-col gap-2 w-full'>
          <div className='rounded-xl bg-grey-500 flex flex-col max-w-[437px]'>
            <div className='p-4 gap-4 flex'>
              <div className='size-5'>▶️</div>
              <div className='inline-block gap-2 w-full max-w-[369px]'>
                <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                  Watch the video!
                </Text>
                <Text
                  as='p'
                  styleVariant='body-small'
                  fontWeight='medium'
                  className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
                >
                  This brief video explains the features we offer
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
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>📚</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Digital collectible comics
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                All comics you collect are stored in your Digital Comic Vault. To generate your Vault you&apos;ll need
                to connect your gmail via TipLink service in the next step!
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>🤝</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Connect with us
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                If you have any questions or would like to connect with our community of comic enthusiasts, drop us a
                message on any social channel.
              </Text>
            </div>
          </div>
        </div>
        <Button variant='secondary' className='rounded-[16px] font-bold text-base w-full' onClick={onClick}>
          I understand!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
