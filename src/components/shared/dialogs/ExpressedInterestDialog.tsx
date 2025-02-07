'use client'

import React from 'react'
import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import { Text } from '@/components/ui'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'
import { ButtonLink } from '@/components/ui/ButtonLink'

type Props = {
  slug: string
} & CommonDialogProps

export const ExpressedInterestDialog: React.FC<Props> = ({ open, slug, toggleDialog }) => {
  const { data: twitterIntent } = fetchTwitterIntentExpressedInterest(slug)

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='max-w-md' hideCloseIcon>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Appreciate the interest!
            </Text>
          </DialogTitle>
          <DialogDescription className='text-left'>
            <div className='rounded-xl bg-grey-400 p-4 gap-4 flex'>
              <div className='size-5'>🐦</div>
              <div className='inline-block gap-2 w-full'>
                <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                  Spread the word
                </Text>
                <Text
                  as='p'
                  styleVariant='body-small'
                  fontWeight='medium'
                  className='max-sm:text-xs text-grey-100 text-ellipsis overflow-auto'
                >
                  Share the campaign and help this story secure funding!
                </Text>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Realistic autorun={{ speed: 0.5, duration: 1000 }} />

        <DialogFooter>
          <DialogButton variant='secondary' onClick={toggleDialog}>
            Nah I&apos;m good
          </DialogButton>
          <ButtonLink
            href={twitterIntent || ''}
            className='bg-green-genesis bg-opacity-100 text-black w-full'
            onClick={toggleDialog}
            target='_blank'
          >
            Share on 𝕏
          </ButtonLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
