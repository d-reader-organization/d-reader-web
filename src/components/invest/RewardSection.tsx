'use client'

import { Project } from '@/models/project'
import { Text } from '../ui'
import { PledgeCard } from './PledgeCard'
import { RewardCard } from './RewardCard'
import React from 'react'
import { ExpressedInterestDialog } from '../shared/dialogs/ExpressedInterestDialog'
import { useToggle } from '@/hooks'
import { RoutePath } from '@/enums/routePath'
import { useRouter } from 'next/navigation'
import { User } from '@/models/user'

type Props = {
  project: Project
  user: User
}

export const RewardSection: React.FC<Props> = ({ project, user }) => {
  const [showExpressedInterestDialog, toggleExpressedInterestDialog] = useToggle()
  const { push } = useRouter()

  return (
    <>
      <div className='col-span-2'>
        <Text styleVariant='primary-heading' as='h3'>
          Select your reward
        </Text>
        <Text styleVariant='body-large' as='p' className='mb-4'>
          Pick which reward you&apos;d like to pledge for
        </Text>
        <RewardCard
          title='Digital comic (pdf)'
          price={100}
          description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
          imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
          project={project}
          toggleExpressedInterestDialog={toggleExpressedInterestDialog}
        />
        <RewardCard
          title='Digital comic (pdf)'
          price={200}
          description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
          imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
          project={project}
          toggleExpressedInterestDialog={toggleExpressedInterestDialog}
        />
        <PledgeCard
          slug={project.slug}
          defaultPrice={300}
          toggleExpressedInterestDialog={toggleExpressedInterestDialog}
        />
      </div>
      {showExpressedInterestDialog && (
        <ExpressedInterestDialog
          slug={project.slug}
          username={user.username}
          open={showExpressedInterestDialog}
          toggleDialog={() => push(RoutePath.InvestDetails(project.slug))}
        />
      )}
    </>
  )
}
