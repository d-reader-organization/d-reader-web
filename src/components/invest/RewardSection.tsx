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
          description='Get the full comic in high-quality PDF—yours to read anytime, anywhere!'
          imageUrl='/assets/images/invest/comic_pdf.png'
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
          description='Own a unique digital edition with exclusive art, bonuses, and guaranteed rarity that only you can own and trade!'
          imageUrl='/assets/images/invest/digital_collectibles.png'
          project={project}
          rewardId={1}
          selectedReward={selectedReward}
          updateSelected={async (cardId) => {
            await handleCardSelect({ amount: 10, cardId })
          }}
        />
        <RewardCard
          title='Physical comic'
          price={50}
          description='A beautifully printed edition to hold, admire, and add to your collection!'
          imageUrl='/assets/images/invest/physical_comic.png'
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
          description='Experience the story like never before with motion, sound, and epic visuals!'
          imageUrl='/assets/images/invest/animated_comic.gif'
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
