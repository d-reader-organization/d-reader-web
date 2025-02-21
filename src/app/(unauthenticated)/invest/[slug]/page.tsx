import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { notFound } from 'next/navigation'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { ProjectInvestDialog } from '@/components/shared/dialogs/ProjectInvestDialog'
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

  const twitterIntent = !!me
    ? fetchTwitterIntentExpressedInterest({ slug: params.slug, username: me.username }).data
    : ''

  return (
    <GenesisLayout
      showFooter
      backgroundImageSrc={project.banner}
      mainClassName=' p-0 md:p-0 lg:p-0 pt-4 md:pt-6 lg:pt-8 xs:pb-24 sm:pb-24 md:pb-24 lg:pb-24'
    >
      <div className='flex flex-col items-center w-full'>
        <ProjectHeader subtitle={project.subtitle} title={project.title} className='max-md:hidden' />
        <div className='flex flex-col max-md:items-center md:flex-row md:justify-center size-full gap-6 md:gap-10 max-w-screen-xl p-4 md:p-6'>
          <div className='flex flex-col max-md:items-center gap-6 md:gap-10 w-full max-w-[750px]'>
            <ProjectBanner
              title={project.title}
              banner={project.banner}
              cover={project.cover}
              videoUrl={project.videoUrl}
            />
            <ProjectHeader subtitle={project.subtitle} title={project.title} className='md:hidden' />
          </div>
          <ProjectFundingCard className='w-full md:max-w-[488px]' isAuthenticated={!!me} project={project} />
        </div>
        <KickstarterTabs
          className='w-full mt-6 md:mt-10 max-w-screen-xl p-4 md:p-6'
          project={project}
          twitterIntent={twitterIntent ?? ''}
          username={me?.username}
        />

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
