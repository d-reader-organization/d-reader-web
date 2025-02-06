'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import { Button, Text } from '@/components/ui'
import Link from 'next/link'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'

type Props = {
  slug: string
} & CommonDialogProps

export const ExpressedInterestDialog: React.FC<Props> = ({ open, slug, toggleDialog }) => {
  const { data: twitterIntent } = fetchTwitterIntentExpressedInterest(slug)

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        aria-describedby=''
        className='max-w-[485px] rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-4'
        hideCloseIcon
      >
        <DialogTitle className='font-satoshi leading-[24px] text-xl text-center'>Appreciate the interest!</DialogTitle>
        <div className='flex flex-col gap-2 w-full'>
          <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
            <div className='size-5'>🐦</div>
            <div className='inline-block gap-2 w-full max-w-[369px]'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                Spread the word
              </Text>
              <Text
                as='p'
                styleVariant='body-small'
                fontWeight='medium'
                className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
              >
                Help this story secure funding by sharing the campaign.
              </Text>
            </div>
          </div>
        </div>
        <Realistic autorun={{ speed: 0.5, duration: 1000 }} />
        <div className='flex justify-between w-full'>
          <Button variant='secondary' className='mr-4 rounded-[16px] font-bold text-base w-full' onClick={toggleDialog}>
            Nah I&apos;m good
          </Button>
          <Link
            href={twitterIntent || ''}
            className='flex justify-center items-center px-2 rounded-[16px] font-bold w-full bg-green-genesis text-black'
            onClick={toggleDialog}
            target='_blank'
          >
            Share on 𝕏
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
