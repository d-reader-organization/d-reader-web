import React from 'react'
import { Text } from '../ui/Text'
import { Creator } from '@/models/creator'
import { FollowCreatorButton } from '../shared/buttons/FollowCreatorButton'
import { formatCurrency } from '@/utils/numbers'
import { ShareButton } from '../shared/buttons/ShareButton'
import { StatsContainer, StatsItem } from '../shared/Stats'

type Props = {
  creator: Creator
}

export const CreatorHeader: React.FC<Props> = ({ creator }) => (
  <div className='flex flex-col w-full mt-5 gap-6 sm:gap-8 max-sm:items-center sm:flex-row sm:justify-between sm:mt-4'>
    <LeftSection creator={creator} />
    <RightSection creator={creator} />
  </div>
)

const LeftSection: React.FC<Props> = ({ creator }) => {
  return (
    <div className='flex flex-col gap-3 w-full text-center items-center sm:max-w-[500px] sm:items-start sm:text-start'>
      <div className='flex flex-col gap-5'>
        <Text as='h3' styleVariant='primary-heading' fontWeight='semibold'>
          {creator.name}
        </Text>
        <Text as='p' className='whitespace-pre-wrap mb-2 text-grey-100' styleVariant='body-normal'>
          {creator.description}
        </Text>
      </div>
      <div className='flex gap-2 items-center'>
        <FollowCreatorButton isFollowing={creator.myStats?.isFollowing} creatorSlug={creator.slug} />
        <ShareButton title={creator.name} text={creator.description} />
      </div>
    </div>
  )
}

const RightSection: React.FC<Props> = ({ creator }) => (
  <>
    <StatsContainer>
      <StatsItem
        label='VOLUME'
        value={formatCurrency({ value: creator.stats.totalVolume, currency: '◎', fractionDigits: 0, divisor: 9 })}
      />
      <StatsItem label='EPISODES' value={creator.stats.comicIssuesCount} />
      <StatsItem label='followers' value={creator.stats.followersCount} />
    </StatsContainer>
  </>
)
