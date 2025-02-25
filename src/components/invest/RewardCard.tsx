'use client'

import { Card, CardContent } from '../ui/card'
import { Text } from '../ui/Text'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CircleIcon } from '../icons/theme/CircleIcon'
import { Button } from '../ui/Button'
import { CheckCircleIcon } from '../icons/theme/CheckCircleIcon'
import { track } from '@vercel/analytics/react'
import { Campaign, CampaignReward } from '@/models/campaign'

type RewardCardProps = {
  reward: CampaignReward
  campaign: Campaign
  selectedReward: number
  viewOnly: boolean
  updateSelected: (value: number) => void
}

export function RewardCard({ campaign, reward, selectedReward, viewOnly, updateSelected }: RewardCardProps) {
  const isSelected = reward.id === selectedReward
  return (
    <Button
      variant='ghost'
      onClick={() => {
        if (!viewOnly) {
          track('Reward card click', { title: reward.name })
          updateSelected(reward.id)
        }
      }}
      className={cn('size-full', viewOnly ? 'cursor-default hover:brightness-100' : '')}
    >
      <Card
        className={cn(
          'text-white w-full max-w-[750px] rounded-xl border border-grey-300',
          isSelected && !viewOnly ? 'border-green-genesis' : ''
        )}
      >
        <CardContent className='flex max-sm:flex-col gap-4 p-4'>
          <Image
            src={reward.image || '/placeholder.svg'}
            alt='Project image'
            width={270}
            height={180}
            priority
            className='rounded-[10px] max-h-[180px] h-full w-auto'
          />
          <div className='flex flex-col items-start gap-3'>
            <div className='flex justify-between w-full'>
              <Text as='p' styleVariant='body-xlarge' fontWeight='bold'>
                {reward.name}
              </Text>
              {viewOnly ? null : isSelected ? (
                <CheckCircleIcon className='size-6 text-green-genesis' />
              ) : (
                <CircleIcon className='size-6 text-grey-300' />
              )}
            </div>
            <Text styleVariant='body-normal' as='p' fontWeight='medium' className='text-grey-100 mb-2'>
              ${reward.price}&nbsp; | &nbsp;{campaign.stats?.tentativeBackers} backers
            </Text>
            <Text as='p' styleVariant='body-small' className='text-grey-100 text-start'>
              {reward.description}
            </Text>
          </div>
        </CardContent>
      </Card>
    </Button>
  )
}
