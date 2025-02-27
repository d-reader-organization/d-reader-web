import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectSummary } from '@/components/payout/ProjectSummary'
import { ProjectPayoutCard } from '@/components/payout/ProjectPayoutCard'
import { notFound } from 'next/navigation'
import { fetchSuccessfulCampaign } from '@/app/lib/api/campaign/queries'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PayoutPage(props: Props) {
  const params = await props.params
  const campaign = fetchSuccessfulCampaign(params.slug)

  if (!campaign) {
    return notFound()
  }

  return (
    <GenesisLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={campaign.title} subtitle={campaign.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-8'>
          <div className='flex flex-col w-full'>
            <ProjectBanner
              title={campaign.title}
              banner={campaign.banner}
              cover={campaign.cover}
              videoUrl={campaign.videoUrl}
            />
            <ProjectHeader title={campaign.title} subtitle={campaign.subtitle} className='md:hidden' />
            <ProjectPayoutCard
              payout={campaign.payout}
              funding={campaign.funding}
              raiseGoal={campaign.raiseGoal}
              className='md:hidden'
            />
            {/* TODO: Update this */}
            {/* <ProjectCreatorSection creator={project.creator} tags={project.tags} /> */}
            <ProjectSummary summary={campaign.payout.summary} />
          </div>
          <div className='flex flex-col'>
            <ProjectPayoutCard
              payout={campaign.payout}
              funding={campaign.funding}
              raiseGoal={campaign.raiseGoal}
              className='max-md:hidden'
            />
          </div>
        </div>
      </div>
    </GenesisLayout>
  )
}
