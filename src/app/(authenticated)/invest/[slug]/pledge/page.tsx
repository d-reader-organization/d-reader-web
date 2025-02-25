import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { Text } from '@/components/ui'
import { fetchCampaign } from '@/app/lib/api/campaign/queries'
import { notFound } from 'next/navigation'
import { RewardSection } from '@/components/invest/RewardSection'
import { fetchMe } from '@/app/lib/api/user/queries'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'
import { ReferPerson } from '@/components/invest/Referral'
import { PledgeActions } from '@/components/invest/PledgeActions'
import { ProjectHeader } from '@/components/shared/ProjectHeader'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PledgePage(props: Props) {
  const params = await props.params
  const { data: campaign, errorMessage } = await fetchCampaign(params.slug)
  const user = await fetchMe()

  if (!campaign || !user || errorMessage) {
    return notFound()
  }

  const { data: twitterIntent } = fetchTwitterIntentExpressedInterest({
    slug: params.slug,
    username: user.username,
  })

  return (
    <GenesisLayout>
      <ProjectHeader title={campaign.title} subtitle={campaign.subtitle} />
      <div className='size-full min-h-screen flex flex-col border-t border-t-grey-300 mt-10 items-center p-4'>
        <div className='flex flex-col gap-6 mt-10 max-w-screen-lg w-full'>
          <div className='flex flex-col gap-3'>
            <Text styleVariant='secondary-heading' as='h4'>
              Select your reward
            </Text>
            <Text styleVariant='body-normal' as='p' fontWeight='medium' className='text-grey-100'>
              Pick which reward you&apos;d like to pledge for
            </Text>
          </div>
          <div className='flex flex-col gap-6 md:gap-10 items-center'>
            <div className='flex flex-col md:flex-row gap-6 w-full max-md:items-center md:justify-start'>
              <RewardSection campaign={campaign} />
              <ReferPerson campaignSlug={campaign.slug} twitterIntent={twitterIntent} username={user.username} />
            </div>
            <PledgeActions slug={campaign.slug} username={user.username} />
          </div>
        </div>
      </div>
    </GenesisLayout>
  )
}
