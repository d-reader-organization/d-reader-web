'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
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
      <DialogContent className='max-w-md' hideCloseIcon>
        {activeStep.title && (
          <DialogHeader>
            <DialogTitle asChild>
              <Text styleVariant='primary-heading' as='h3'>
                {activeStep.title}
              </Text>
            </DialogTitle>
            <DialogDescription className='text-left'>
              {activeStep.items.map((item) => {
                if (item.video) return <VideoItem key={item.title} {...item} />
                return <TextItem key={item.title} {...item} />
              })}
            </DialogDescription>
          </DialogHeader>
        )}

        <Button variant='secondary' className='w-full' onClick={onClick}>
          {activeStep.buttonLabel}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

const TextItem: React.FC<DialogContentItem> = ({ icon, title, text }) => {
  return (
    <div className='rounded-xl bg-grey-400 p-4 gap-4 flex '>
      <div className='size-5'>{icon}</div>
      <div className='flex flex-col gap-1 w-full '>
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
    <div className='rounded-xl bg-grey-500 flex flex-col '>
      <div className='p-4 gap-4 flex'>
        <div className='size-5'>{icon}</div>
        <div className='flex flex-col gap-1 w-full '>
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
