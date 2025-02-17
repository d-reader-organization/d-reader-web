import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { notFound } from 'next/navigation'
import { fetchProject, fetchUserInterestedReceipts } from '@/app/lib/api/invest/queries'
import { ProjectInvestDialog } from '@/components/shared/dialogs/ProjectInvestDialog'
import { InterestUpdatesCard } from '@/components/invest/InterestUpdatesCard'
import { ReferFriend } from '@/components/invest/Referral'
import { fetchMe } from '@/app/lib/api/user/queries'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'
import { KickstarterTabs } from '@/components/invest/KickstarterTabs'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectInvestPage(props: Props) {
  const params = await props.params
  const { data: project, errorMessage } = await fetchProject(params.slug)
  const me = await fetchMe()
  if (!project || errorMessage) {
    return notFound()
  }

  const twitterIntent = !!me ? fetchTwitterIntentExpressedInterest(params.slug, me.username).data : ''
  const receipts = await fetchUserInterestedReceipts(project.slug)
  return (
    <GenesisLayout showFooter backgroundImageSrc={project.banner}>
      <div className='flex flex-col max-md:items-center max-w-screen-xl w-full'>
        <ProjectHeader subtitle={project.subtitle} title={project.title} className='max-md:hidden' />
        <div className='flex flex-col max-md:items-center md:flex-row md:justify-center w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col max-md:items-center gap-6 md:gap-10 max-md:w-full'>
            <ProjectBanner
              title={project.title}
              banner={project.banner}
              cover={project.cover}
              videoUrl={project.videoUrl}
            />
            <ProjectHeader subtitle={project.subtitle} title={project.title} className='md:hidden' />
            <KickstarterTabs className='max-md:hidden mt-4' project={project} />
          </div>
          <div className='flex flex-col items-center gap-12 w-full md:max-w-[488px]'>
            <ProjectFundingCard isAuthenticated={!!me} project={project} />
            {!!me ? (
              <ReferFriend twitterIntent={twitterIntent} username={me?.username} />
            ) : (
              <InterestUpdatesCard className='max-md:hidden' receipts={receipts} />
            )}
          </div>
          <KickstarterTabs className='md:hidden w-full p-4' project={project} />
        </div>
        {/* <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full items-center'>
            <ProjectBanner
              title={project.title}
              banner={project.banner}
              cover={project.cover}
              videoUrl={project.videoUrl}
            />
            <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
            <ProjectFundingCard isAuthenticated={!!me} project={project} />
          </div>
          <div className='flex flex-col gap-12 w-full max-w-[488px]'>
          <ProjectFundingCard isAuthenticated={!!me} project={project} />
            {!!me ? (
              <ReferFriend twitterIntent={twitterIntent} username={me?.username} />
            ) : (
              <InterestUpdatesCard className='max-md:hidden' receipts={receipts} />
            )}
          </div>
        </div>
        <ProjectInfo info={project.info} /> */}
      </div>
      <ProjectInvestDialog />
    </GenesisLayout>
  )
}
