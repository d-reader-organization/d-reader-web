import React from 'react'
import { Text } from '../ui'
import { fetchMe } from '@/app/lib/api/user/queries'
import { CopyButton } from '../shared/CopyButton'
import { generateReferralLink } from '@/constants/general'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'
import { ButtonLink } from '../ui/ButtonLink'

export const ReferralSettings: React.FC = async () => {
  const me = await fetchMe()
  if (!me) return null

  const slug = 'bonk-and-the-curse-of-the-bear-king'
  const referralLink = generateReferralLink(slug, me.username)
  const { data: twitterIntent } = fetchTwitterIntentExpressedInterest(slug, referralLink)

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Text as='h4' styleVariant='secondary-heading'>
          Referrals
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 font-medium'>
          You get limited referrals each day based on your activity on the app, Refer your friends and earn exciting
          rewards:
        </Text>
      </div>
      <div className='flex justify-between border border-grey-300 p-5 rounded-xl gap-5 max-w-[607px]'>
        <div className='flex flex-col items-center border border-grey-300 p-4 rounded-lg w-full'>
          <Text as='h2' styleVariant='body-large' fontWeight='bold'>
            {me.referralsRemaining}
          </Text>
          <Text as='h2' styleVariant='body-large' fontWeight='bold'>
            Available
          </Text>
        </div>
        <div className='flex flex-col items-center border border-grey-300 p-4 rounded-lg w-full'>
          <Text as='h2' styleVariant='body-large' fontWeight='bold'>
            {me.referralUsed || 0}
          </Text>
          <Text as='h2' styleVariant='body-large' fontWeight='bold'>
            Used
          </Text>
        </div>
      </div>
      <div className='flex gap-4'>
        <ButtonLink
          href={twitterIntent || ''}
          className=' w-fit bg-green-genesis bg-opacity-100 text-black'
          target='_blank'
        >
          Share on 𝕏
        </ButtonLink>
        <CopyButton clipboard={referralLink} text='Copy your referral link' className='max-w-fit' />
      </div>
    </div>
  )
}
