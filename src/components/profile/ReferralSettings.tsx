import React from 'react'
import { fetchMe, fetchUserReferrals } from '@/app/lib/api/user/queries'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { fetchTwitterIntentInviteUser } from '@/app/lib/api/twitter/queries'
import { Referral, ReferralCampaign } from '@/models/project'
import { Avatar, AvatarImage } from '../ui/avatar'
import { TokenIcon } from '../icons/logo/TokenIcon'
import { SignedUpChip } from '../shared/chips/SignedUpChip'
import { Text } from '../ui'
import { fetchAllReferralCampaignReceipts, fetchProject } from '@/app/lib/api/invest/queries'
import Image from 'next/image'
import { EmptyReferral } from './EmptyReferral'
import { ReferralCard } from './ReferralCard'

export const ReferralSettings: React.FC = async () => {
  const me = await fetchMe()
  if (!me) return null

  const referrals = await fetchUserReferrals()
  const { data: twitterIntent } = await fetchTwitterIntentInviteUser(me.username)

  return (
    <div className='flex gap-14'>
      <div className='w-full flex flex-col gap-6 max-w-[617px]'>
        <ReferralCard twitterIntent={twitterIntent || ''} />
        <UserReferralList referralsRemaining={me.referralsRemaining} referrals={referrals} username={me.username} />
        <CampaignReferralList username={me.username} />
      </div>
    </div>
  )
}

type UserReferralListProps = {
  username: string
  referralsRemaining: number
  referrals: Referral[]
}

const UserReferralList: React.FC<UserReferralListProps> = async ({ referrals, referralsRemaining }) => {
  const isSuccesfulReferrals = referrals && referrals.length
  return (
    <div className='flex flex-col gap-4'>
      {/* Referrals Section */}
      <Text as='h5' styleVariant='secondary-heading' fontWeight='bold' className='text-white'>
        New user referrals <span className='text-white/60'>{`( ${referralsRemaining} referrals remaining) `}</span>
      </Text>

      {isSuccesfulReferrals ? (
        referrals.map((referral, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <div className='flex rounded-xl p-4 border-1 border-grey-300 justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar className='w-10 h-10'>
                  <AvatarImage src={referral.avatar || PLACEHOLDER_AVATAR} alt='User avatar' />
                </Avatar>
                <Text as='span' fontWeight='medium' styleVariant='body-normal'>
                  {referral.displayName}
                </Text>
                <SignedUpChip />
              </div>
              <div className='flex gap-2 items-center'>
                <Text as='span' fontWeight='medium' styleVariant='body-normal' className='text-important-color'>
                  +50
                </Text>
                <TokenIcon className='h-5 w-5' />
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyReferral />
      )}
    </div>
  )
}

const CampaignReferralList: React.FC<{ username: string }> = async ({ username }) => {
  const campaigns = await fetchAllReferralCampaignReceipts()

  return (
    <div className='flex flex-col gap-4'>
      {/* Referrals Section */}
      <Text as='h5' styleVariant='secondary-heading' fontWeight='bold' className='text-white'>
        Campaign referrals
      </Text>
      {campaigns &&
        campaigns.map((campaign, index) => <CampaignReferral key={index} campaign={campaign} username={username} />)}
    </div>
  )
}

const CampaignReferral: React.FC<{ campaign: ReferralCampaign; username: string }> = async ({ campaign }) => {
  const { data: project } = await fetchProject(campaign.slug)
  const isSuccesfulReferrals = campaign.totalReferred

  return (
    <div className='flex flex-col rounded-xl p-4 border-1 border-grey-300 gap-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image
            src={project?.banner || PLACEHOLDER_AVATAR}
            alt='banner'
            width={53}
            height={53}
            className='rounded-md'
          />
          <Text as='span' fontWeight='medium' styleVariant='body-normal'>
            {campaign.title}
          </Text>
        </div>
        <Text as='span' fontWeight='medium' styleVariant='body-normal' className='text-grey-100'>
          {campaign.totalReferred}
        </Text>
      </div>
      <div>
        {isSuccesfulReferrals ? (
          campaign.receipts.map((referral, index) => (
            <div key={index} className='flex p-2 border-t-1 border-grey-300 justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar className='w-5 h-5'>
                  <AvatarImage src={referral.user.avatar || PLACEHOLDER_AVATAR} alt='User avatar' />
                </Avatar>
                <Text as='span' fontWeight='medium' styleVariant='body-normal'>
                  {referral.user.username}
                </Text>
                <div className='bg-grey-400 rounded-lg px-2'>
                  <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100'>
                    {referral.expressedAmount}$
                  </Text>
                </div>
              </div>
              <div className='flex gap-2'>
                <Text as='span' fontWeight='medium' styleVariant='body-normal' className='text-important-color'>
                  +50
                </Text>
                <TokenIcon className='h-5 w-5' />
              </div>
            </div>
          ))
        ) : (
          <EmptyReferral />
        )}
      </div>
    </div>
  )
}
