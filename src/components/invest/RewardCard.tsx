'use client'

import { Project } from '@/models/project'
import { Card, CardContent } from '../ui/card'
import { Text } from '../ui/Text'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CircleIcon } from '../icons/theme/CircleIcon'
import { Button } from '../ui/Button'
import { CheckCircleIcon } from '../icons/theme/CheckCircleIcon'

type RewardCardProps = {
  title: string
  price: number
  description: string
  imageUrl: string
  project: Project
  rewardId: number
  selectedReward: number
  updateSelected: (value: number) => void
}

export function RewardCard({
  title,
  price,
  description,
  imageUrl,
  project,
  rewardId,
  selectedReward,
  updateSelected,
}: RewardCardProps) {
  const isSelected = rewardId === selectedReward

  return (
    <Button
      variant='ghost'
      onClick={() => {
        updateSelected(rewardId)
      }}
      className='size-full'
    >
      <Card
        className={cn(
          'text-white w-full max-w-[750px] rounded-xl border border-grey-300',
          isSelected ? 'border-green-genesis' : ''
        )}
      >
        <CardContent className='flex gap-4 p-4'>
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt='Project image'
            width={270}
            height={180}
            priority
            className='rounded-[10px] max-h-[180px] h-full w-auto'
          />
          <div className='flex flex-col items-start gap-3'>
            <div className='flex justify-between w-full'>
              <Text as='p' styleVariant='body-xlarge' fontWeight='bold'>
                {title}
              </Text>
              {isSelected ? (
                <CheckCircleIcon className='size-6 text-green-genesis' />
              ) : (
                <CircleIcon className='size-6 text-grey-300' />
              )}
            </div>
            <Text styleVariant='body-normal' as='p' fontWeight='medium' className='text-grey-100 mb-2'>
              ${price}&nbsp; | &nbsp;{project.funding.numberOfBackers} backers
            </Text>
            <Text as='p' styleVariant='body-small' className='text-grey-100 text-start'>
              {description}
            </Text>
          </div>
        </CardContent>
      </Card>
    </Button>
  )
}
