import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { Text } from '@/components/ui'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton } from '@/components/shared/buttons/RequireAuthWrapperButton'
import { PledgeCard } from '@/components/invest/PledgeCard'
import { RewardCard } from '@/components/invest/RewardCard'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PledgePage(props: Props) {
  const params = await props.params
  const { data: project, errorMessage } = await fetchProject(params.slug)

  if (!project || errorMessage) {
    return notFound()
  }

  return (
    <GenesisLayout>
      <div className='text-center'>
        <Text as='h1' styleVariant='primary-heading'>
          {project.title}
        </Text>
        <div className='flex gap-2 items-center'>
          <Image width={100} height={100} src={project.creator.avatar} alt='' className='size-10 rounded-full' />
          <Text as='h4' styleVariant='secondary-heading' fontWeight='medium' className='text-grey-100'>
            {project.creator.displayName}
          </Text>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-md text-white mx-auto mt-6'>
        <div className='col-span-2'>
          <Text styleVariant='primary-heading' as='h3'>
            Select your reward
          </Text>
          <Text styleVariant='body-large' as='p' className='mb-4'>
            Pick which reward you&apos;d like to pledge for
          </Text>
          <RewardCard
            title='Digital comic (pdf)'
            price={5}
            description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
            imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
            project={project}
          />
          <RewardCard
            title='Digital comic (pdf)'
            price={5}
            description='Use this tier to receive a DRM-Free PDF copy plus any and all digital goodies unlocked via Stretch Goals.far!)'
            imageUrl='/assets/images/dummy-kickstarter-reward.jpg'
            project={project}
          />
          <PledgeCard slug={project.slug} defaultPrice={100} />
        </div>
        <div>
          <ReferFriend />
          {/* <FAQ /> */}
        </div>
      </div>
    </GenesisLayout>
  )
}

function ReferFriend() {
  return (
    <Card className='mb-6 text-white'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <span className='text-2xl'>🎁</span> Refer a friend!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-2'>You unlock benefits for every friend you onboard to the platform!</p>
        <p className='font-semibold'>These include:</p>
        <ul className='list-disc list-inside'>
          <li>some reward #1</li>
          <li>some reward #2</li>
          <li>some reward #3</li>
        </ul>
      </CardContent>
    </Card>
  )
}
