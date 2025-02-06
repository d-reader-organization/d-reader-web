'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import { Button } from '@/components/ui'
import { useLocalStorage, useToggle } from '@/hooks'
import { Text } from '@/components/ui'
import { LOCAL_STORAGE } from '@/constants/general'

export const MintPageWelcomeDialog: React.FC = () => {
  const [isDialogRead, setIsDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_MINT_PAGE_VISITED, false)
  const [mintPageWelcomeDialog, toggleMintPageWelcomeDialog] = useToggle(!isDialogRead)

  const onClick = () => {
    toggleMintPageWelcomeDialog()
    setIsDialogRead(true)
  }

  return (
    <Dialog open={mintPageWelcomeDialog} onOpenChange={toggleMintPageWelcomeDialog}>
      <DialogContent className='max-w-md' hideCloseIcon aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Welcome to dReader!
            </Text>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-2 w-full text-left'>
          <div className='rounded-xl bg-grey-400 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>✊</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Spread the word!
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Be a chad and &apos;Share on 𝕏&apos; after minting. The post will tag relevant artists and you&apos;ll
                make their day!
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-400 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>💸</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Protocol fees
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Buying a collectible on Solana can incur minor fees on top of the price you pay: ~0.0033 SOL (70 cents)
              </Text>
            </div>
          </div>
          <div className='rounded-xl bg-grey-400 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>🎁</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Use discounts!
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Registered users and collectors get discounts! Check your eligibility before buying.
              </Text>
            </div>
          </div>
        </div>
        <Button variant='white' className='w-full' onClick={onClick}>
          I understand!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
