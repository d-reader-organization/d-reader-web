'use client'

import { Project } from '@/models/project'
import { RewardCard } from './RewardCard'
import React, { useState } from 'react'
import { ExpressedInterestDialog } from '../shared/dialogs/ExpressedInterestDialog'
import { useToggle } from '@/hooks'
import { User } from '@/models/user'

type Props = {
  project: Project
  user: User
}

export const RewardSection: React.FC<Props> = ({ project, user }) => {
  const [showExpressedInterestDialog, toggleExpressedInterestDialog] = useToggle()
  const [selectedReward, setSelectedReward] = useState(0)
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
          updateSelected={(value) => {
            setSelectedReward(value)
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
          updateSelected={(value) => {
            setSelectedReward(value)
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
          updateSelected={(value) => {
            setSelectedReward(value)
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
          updateSelected={(value) => {
            setSelectedReward(value)
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
