'use client'

import { RewardCard } from './RewardCard'
import React, { useState } from 'react'
import { useToggle } from '@/hooks'
import { useSearchParams } from 'next/navigation'
import { REFERRAL_CODE_KEY } from '@/constants/general'
import { expressInterest } from '@/app/lib/api/campaign/mutations'
import { toast } from '../ui/toast'
import { Campaign } from '@/models/campaign'
import { ExpressInterestParams } from '@/models/campaign/campaignParams'

type Props = {
  viewOnly?: boolean
  campaign: Campaign
}

export const RewardSection: React.FC<Props> = ({ viewOnly = false, campaign }) => {
  // const defaultSelected = rewards.findIndex((reward) => reward.price === project.funding.expressedAmount) ?? 0
  const [selectedReward, setSelectedReward] = useState(0) //TODO: update this
  const searchParams = useSearchParams()
  const referralCode = searchParams.get(REFERRAL_CODE_KEY)
  const [isLoading, toggleLoader] = useToggle(false)

  const handleCardSelect = async ({ rewardId, amount }: { rewardId: number; amount: number }) => {
    toggleLoader()
    if (isLoading) {
      return
    }
    setSelectedReward(rewardId)
    const request: ExpressInterestParams = { expressedAmount: amount, ref: referralCode }
    const { errorMessage } = await expressInterest({ slug: campaign.slug, request })
    toggleLoader()

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        {campaign.rewards &&
          campaign.rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              campaign={campaign}
              reward={reward}
              selectedReward={selectedReward}
              viewOnly={viewOnly}
              updateSelected={async (rewardId) => {
                await handleCardSelect({ amount: reward.price, rewardId })
              }}
            />
          ))}
      </div>
    </>
  )
}
