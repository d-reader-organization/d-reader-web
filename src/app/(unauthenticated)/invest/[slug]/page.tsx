import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectInfo } from '@/components/invest/ProjectInfo'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { notFound } from 'next/navigation'
import { fetchProject, fetchUserInterestedReceipts } from '@/app/lib/api/invest/queries'
import { ProjectInvestDialog } from '@/components/shared/dialogs/ProjectInvestDialog'
import { InterestUpdatesCard } from '@/components/invest/InterestUpdatesCard'
import { isAuthenticatedUser } from '@/app/lib/utils/auth'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectInvestPage(props: Props) {
  const params = await props.params
  const { data: project, errorMessage } = await fetchProject(params.slug)

  if (!project || errorMessage) {
    return notFound()
  }

  const receipts = await fetchUserInterestedReceipts(project.slug)
  const isAuthenticated = await isAuthenticatedUser()
  return (
    <GenesisLayout showFooter>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner
              title={project.title}
              banner={project.banner}
              cover={project.cover}
              videoUrl={project.videoUrl}
            />
            <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
            <ProjectFundingCard
              isAuthenticated={isAuthenticated}
              funding={project.funding}
              slug={project.slug}
              className='md:hidden'
            />
            <ProjectCreatorSection creator={project.creator} tags={project.tags} />
            <InterestUpdatesCard className='md:hidden -ml-4 w-screen rounded-none' receipts={receipts} />
            <ProjectInfo info={project.info} />
          </div>
          <div className='flex flex-col'>
            <ProjectFundingCard
              isAuthenticated={isAuthenticated}
              funding={project.funding}
              slug={project.slug}
              className='max-md:hidden'
            />
            <InterestUpdatesCard className='max-md:hidden' receipts={receipts} />
          </div>
        </div>
      </div>
      <ProjectInvestDialog />
    </GenesisLayout>
  )
}
