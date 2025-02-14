import React from 'react'
import { fetchMe, fetchUserReferrals } from '@/app/lib/api/user/queries'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { fetchTwitterIntentInviteUser } from '@/app/lib/api/twitter/queries'
import { Referral } from '@/models/project'
import { Card } from '../ui/card'
import { Avatar, AvatarImage } from '../ui/avatar'
import { ShareIcon } from '../icons/theme/ShareIcon'
import { TokenIcon } from '../icons/logo/TokenIcon'
import { SignedUpChip } from '../shared/chips/SignedUpChip'
import { ButtonLink } from '../ui/ButtonLink'
import { Text } from '../ui'

export const ReferralSettings: React.FC = async () => {
  const me = await fetchMe()
  if (!me) return null

  const referrals = await fetchUserReferrals()

  return (
    <div className='flex flex-col gap-6 max-w-[617px]'>
      <ReferralCard username={me.username} />
      {referrals && <UserReferralList referralsRemaining={me.referralsRemaining} referrals={referrals} />}
    </div>
  )
}

export function ReferralCard({ username }: { username: string }) {
  const { data: twitterIntent } = fetchTwitterIntentInviteUser(username)

  return (
    <Card className='flex flex-col gap-4 bg-blue-300 rounded-xl border-none shadow-xl p-4'>
      <div className='flex flex-col bg-[#727CAC66] rounded-xl justify-center p-6 gap-4'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Text as='h2' styleVariant='primary-heading' className='text-white'>
              BUN POINTS
            </Text>
            {/* <HelpCircle className="w-6 h-6 text-white/80" /> */}
          </div>
          <div className='flex items-center gap-2'>
            <Text as='h2' styleVariant='primary-heading' fontWeight='bold' className='text-important-color'>
              0
            </Text>
            <TokenIcon />
          </div>
        </div>

        {/* Description */}
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-white max-w-[354px]'>
          Spread the fun and get rewarded when new users join or show interest in Genesis campaigns.
        </Text>
      </div>
      {/* Share Button */}
      <ButtonLink variant='white' size='lg' href={twitterIntent || ''} target='_blank'>
        <ShareIcon className='w-5 h-5 mr-2' />
        <Text as='span' styleVariant='body-normal' fontWeight='bold'>
          Share referral code
        </Text>
      </ButtonLink>
    </Card>
  )
}

type UserReferralListProps = {
  referralsRemaining: number
  referrals: Referral[]
}

const UserReferralList: React.FC<UserReferralListProps> = async ({ referrals, referralsRemaining }) => {
  return (
    <div className='flex flex-col gap-4'>
      {/* Referrals Section */}
      <Text as='h5' styleVariant='secondary-heading' fontWeight='bold' className='text-white'>
        User referrals <span className='text-white/60'>{`( ${referralsRemaining} referrals remaining) `}</span>
      </Text>

      {referrals.map((referral, index) => (
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
            <div className='flex items-center gap-2'>
              <Text as='span' fontWeight='medium' styleVariant='body-normal' className='text-important-color'>
                +50
              </Text>
              <TokenIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
