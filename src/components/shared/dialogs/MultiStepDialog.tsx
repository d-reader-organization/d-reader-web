'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import { Button } from '@/components/ui'
import { Text } from '@/components/ui'
import useSteps from '@/hooks/useSteps'
import { DialogContentItem, DialogStep } from '@/constants/dialogs'

type Props = {
  steps: DialogStep[]
  open: boolean
  toggleDialog: VoidFunction
  onCompleted: VoidFunction
}

export const MultiStepDialog: React.FC<Props> = ({ steps, open, toggleDialog, onCompleted }) => {
  const { activeStep, isLastStep, next } = useSteps(steps)

  const onClick = () => {
    if (isLastStep) {
      onCompleted()
    } else next()
  }

  if (!activeStep) return null

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        aria-describedby=''
        className='max-w-[485px] rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-4'
        hideCloseIcon
      >
        {activeStep.title && (
          <DialogTitle className='font-satoshi leading-[24px] text-xl text-center'>{activeStep.title}</DialogTitle>
        )}
        <div className='flex flex-col gap-2 w-full'>
          {activeStep.items.map((item) => {
            if (item.video) return <VideoItem key={item.title} {...item} />
            return <TextItem key={item.title} {...item} />
          })}
        </div>
        <Button variant='secondary' className='rounded-[16px] font-bold text-base w-full' onClick={onClick}>
          {activeStep.buttonLabel}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

const TextItem: React.FC<DialogContentItem> = ({ icon, title, text }) => {
  return (
    <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]'>
      <div className='size-5'>{icon}</div>
      <div className='flex flex-col gap-1 w-full max-w-[369px]'>
        <Text as='p' styleVariant='body-normal' fontWeight='bold'>
          {title}
        </Text>
        {text && (
          <Text
            as='p'
            styleVariant='body-small'
            fontWeight='medium'
            className='text-grey-100 text-ellipsis overflow-auto whitespace-pre text-wrap'
          >
            {text}
          </Text>
        )}
      </div>
    </div>
  )
}

const VideoItem: React.FC<DialogContentItem> = ({ icon, title, text, video }) => {
  return (
    <div className='rounded-xl bg-grey-500 flex flex-col max-w-[437px]'>
      <div className='p-4 gap-4 flex'>
        <div className='size-5'>{icon}</div>
        <div className='flex flex-col gap-1 w-full max-w-[369px]'>
          <Text as='p' styleVariant='body-normal' fontWeight='bold'>
            {title}
          </Text>
          {text && (
            <Text
              as='p'
              styleVariant='body-small'
              fontWeight='medium'
              className='text-grey-100 text-ellipsis overflow-auto'
            >
              {text}
            </Text>
          )}
        </div>
      </div>
      <div className='pl-4 pr-4 pb-4'>
        <iframe src={video} className='w-full h-auto aspect-video rounded-md' />
      </div>
    </div>
  )
}
