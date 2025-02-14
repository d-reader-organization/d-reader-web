import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { Text } from '@/components/ui'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { notFound } from 'next/navigation'
import { RewardSection } from '@/components/invest/RewardSection'
import { fetchMe } from '@/app/lib/api/user/queries'
import { fetchTwitterIntentExpressedInterest } from '@/app/lib/api/twitter/queries'
import { ReferFriend } from '@/components/invest/Referral'
import { PledgeActions } from '@/components/invest/PledgeActions'
import { ProjectHeader } from '@/components/shared/ProjectHeader'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PledgePage(props: Props) {
  const params = await props.params
  const { data: project, errorMessage } = await fetchProject(params.slug)
  const user = await fetchMe()

  if (!project || !user || errorMessage) {
    return notFound()
  }
  const { data: twitterIntent } = fetchTwitterIntentExpressedInterest(params.slug, user.username)

  return (
    <GenesisLayout mainClassName='px-0 pb-0 md:px-0 md:pb-0 lg:px-0 lg:p-0'>
      <ProjectHeader title={project.title} subtitle={project.subtitle} />
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
              <RewardSection project={project} user={user} />
              <ReferFriend twitterIntent={twitterIntent} username={user.username} />
            </div>
            <PledgeActions />
          </div>
        </div>
      </div>
    </GenesisLayout>
  )
}
