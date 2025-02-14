'use client'

import { Project } from '@/models/project'
import { Card, CardContent } from '../ui/card'
import { Text } from '../ui/Text'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CircleIcon } from '../icons/theme/CircleIcon'
import { Button } from '../ui'
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
          className='rounded-[10px] max-h-[180px] h-full w-auto'
        />
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <Text as='p' styleVariant='body-xlarge' fontWeight='bold'>
              {title}
            </Text>
            <Button
              iconOnly
              Icon={isSelected ? CheckCircleIcon : CircleIcon}
              solid={isSelected}
              className='size-6'
              iconClassName={cn('size-6', isSelected ? 'text-green-genesis' : 'text-grey-300')}
              variant='ghost'
              onClick={() => updateSelected(rewardId)}
            />
          </div>
          <Text styleVariant='body-normal' as='p' fontWeight='medium' className='text-grey-100 mb-2'>
            ${price}&nbsp; | &nbsp;{project.funding.numberOfBackers} backers
          </Text>
          <Text as='p' styleVariant='body-small' className='text-grey-100'>
            {description}
          </Text>
        </div>
      </CardContent>
    </Card>
  )
}
