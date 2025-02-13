import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { Text } from '@/components/ui'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { RewardSection } from '@/components/invest/RewardSection'
import { fetchMe } from '@/app/lib/api/user/queries'

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
        <RewardSection project={project} user={user} />
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
