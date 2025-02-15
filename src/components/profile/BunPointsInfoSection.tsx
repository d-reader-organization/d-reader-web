'use client'

import React from 'react'
import { Button } from '@/components/ui'
import { Text } from '@/components/ui'
import { useToggle } from '@/hooks'
import { BunPointsCollectionIcon } from '@/components/icons/genesis/BunPointsCollectionIcon'
import { cn } from '@/lib/utils'

type Props = { defaultOpen?: boolean; className?: string }

export const BunPointsInfoSection: React.FC<Props> = ({ defaultOpen, className }) => {
  const [showDialog, toggleDialog] = useToggle(defaultOpen)

  return (
    <div
      className={cn(
        `flex flex-col gap-6 bg-grey-500 max-w-[424px] rounded-3xl sm:rounded-3xl p-5 max-h-fit ${!showDialog && 'hidden'}`,
        className
      )}
      aria-describedby={undefined}
    >
      <div className='flex flex-col text-center items-center'>
        <Text as='h3' styleVariant='primary-heading'>
          What are the Bun Points ?
        </Text>
        <BunPointsCollectionIcon className='scale-90' />
        <div className='flex flex-col gap-2'>
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
            Think of them as your <span className='font-bold text-white'>golden tickets to epic rewards</span> – earn
            them, stack them, and unlock awesome surprises!
          </Text>
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
            <span className='font-bold text-white'>More info coming soon</span>,<br />
            so stay tuned and <span className='font-bold text-white'>keep collecting!</span>
          </Text>
        </div>
      </div>
      <Button size='lg' variant='secondary' className='w-full' onClick={toggleDialog}>
        Got it!
      </Button>
    </div>
  )
}
