'use client'

import { ExpressInterest, Project } from '@/models/project'
import { RewardCard } from './RewardCard'
import React, { useState } from 'react'
import { ExpressedInterestDialog } from '../shared/dialogs/ExpressedInterestDialog'
import { useToggle } from '@/hooks'
import { User } from '@/models/user'
import { useSearchParams } from 'next/navigation'
import { REFERRAL_CODE_KEY } from '@/constants/general'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { toast } from '../ui/toast'

type Props = {
  project: Project
  user: User
}

export const RewardSection: React.FC<Props> = ({ project, user }) => {
  const [showExpressedInterestDialog, toggleExpressedInterestDialog] = useToggle()
  const [selectedReward, setSelectedReward] = useState(0)
  const searchParams = useSearchParams()
  const referralCode = searchParams.get(REFERRAL_CODE_KEY)
  const [isLoading, toggleLoader] = useToggle(false)

  const handleCardSelect = async ({ cardId, amount }: { cardId: number; amount: number }) => {
    toggleLoader()
    if (isLoading) {
      return
    }
    setSelectedReward(cardId)
    const request: ExpressInterest = { expressedAmount: amount, ref: referralCode }
    const { errorMessage } = await expressInterest({ slug: project.slug, request })
    toggleLoader()

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }
    toggleExpressedInterestDialog()
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <RewardCard
          title='Digital Comic (pdf)'
          price={5}
          description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
          imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
          project={project}
          rewardId={0}
          selectedReward={selectedReward}
          updateSelected={async (cardId) => {
            await handleCardSelect({ amount: 5, cardId })
          }}
        />
        <RewardCard
          title='Digital Collectible Comic'
          price={10}
          description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
          imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
          project={project}
          rewardId={1}
          selectedReward={selectedReward}
          updateSelected={async (cardId) => {
            await handleCardSelect({ amount: 10, cardId })
          }}
        />
        <RewardCard
          title='Physical hard cover graphic novel'
          price={50}
          description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
          imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
          project={project}
          rewardId={2}
          selectedReward={selectedReward}
          updateSelected={async (cardId) => {
            await handleCardSelect({ amount: 50, cardId })
          }}
        />
        <RewardCard
          title='Animated comic'
          price={100}
          description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
          imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
          project={project}
          rewardId={3}
          selectedReward={selectedReward}
          updateSelected={async (cardId) => {
            await handleCardSelect({ amount: 100, cardId })
          }}
        />
      </div>
      {showExpressedInterestDialog && (
        <ExpressedInterestDialog
          slug={project.slug}
          username={user.username}
          open={showExpressedInterestDialog}
          toggleDialog={toggleExpressedInterestDialog}
        />
      )}
    </>
  )
}
