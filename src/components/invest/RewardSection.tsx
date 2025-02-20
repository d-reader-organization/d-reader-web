'use client'

import { type Reward, type ExpressInterest, type Project } from '@/models/project'
import { RewardCard } from './RewardCard'
import React, { useState } from 'react'
import { useToggle } from '@/hooks'
import { useSearchParams } from 'next/navigation'
import { REFERRAL_CODE_KEY } from '@/constants/general'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { toast } from '../ui/toast'

type Props = {
  viewOnly?: boolean
  project: Project
}

const rewards: Reward[] = [
  {
    id: 0,
    description: 'Get the full comic in high-quality PDF—yours to read anytime, anywhere!',
    image: '/assets/images/invest/comic_pdf.png',
    price: 5,
    title: 'Digital Comic (pdf)',
  },
  {
    id: 1,
    description:
      'Own a unique digital edition with exclusive art, bonuses, and guaranteed rarity that only you can own and trade!',
    image: '/assets/images/invest/digital_collectibles.png',
    price: 10,
    title: 'Digital Collectible Comic',
  },
  {
    id: 2,
    description: 'A beautifully printed edition to hold, admire, and add to your collection!',
    image: '/assets/images/invest/physical_comic.png',
    price: 50,
    title: 'Physical comic',
  },
  {
    id: 3,
    description: 'Experience the story like never before with motion, sound, and epic visuals!',
    image: '/assets/images/invest/animated_comic.gif',
    price: 100,
    title: 'Animated comic',
  },
]

export const RewardSection: React.FC<Props> = ({ viewOnly = false, project }) => {
  const defaultSelected = rewards.findIndex((reward) => reward.price === project.funding.expressedAmount) ?? 0
  const [selectedReward, setSelectedReward] = useState(defaultSelected)
  const searchParams = useSearchParams()
  const referralCode = searchParams.get(REFERRAL_CODE_KEY)
  const [isLoading, toggleLoader] = useToggle(false)

  const handleCardSelect = async ({ rewardId, amount }: { rewardId: number; amount: number }) => {
    toggleLoader()
    if (isLoading) {
      return
    }
    setSelectedReward(rewardId)
    const request: ExpressInterest = { expressedAmount: amount, ref: referralCode }
    const { errorMessage } = await expressInterest({ slug: project.slug, request })
    toggleLoader()

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            project={project}
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
