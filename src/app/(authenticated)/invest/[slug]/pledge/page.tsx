import { GenesisLayout } from '@/components/layout/GenesisLayout'
import { Button, Input, Text } from '@/components/ui'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton } from '@/components/shared/buttons/RequireAuthWrapperButton'
import { Project } from '@/models/project'
import { ConfirmInterestButton } from '@/components/invest/ConfirmInterestButton'

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
          <PledgeCard slug={project.slug} />
        </div>
        <div>
          <ReferFriend />
          {/* <FAQ /> */}
        </div>
      </div>
    </GenesisLayout>
  )
}

type RewardCardProps = {
  title: string
  price: number
  description: string
  imageUrl: string
  project: Project
}

function RewardCard({ title, price, description, imageUrl, project }: RewardCardProps) {
  return (
    <Card className='mb-6 text-white'>
      <CardContent className='p-6'>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-xl mb-2'>{title}</CardTitle>
            <Text styleVariant='body-large' as='p' className='font-semibold text-grey-100'>
              ${price} • {project.funding.numberOfBackers} backers
            </Text>
            <p className='mt-2'>{description}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt='Comic preview'
              width={100}
              height={100}
              className='rounded-md'
            />
            <ConfirmInterestButton
              slug={project.slug}
              isUserInterested={!!project.funding.expressedAmount}
              className='min-w-[146px]'
            />
          </div>
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button className='w-full bg-green-genesis border-green-300'>Express Interest</Button>
      </CardFooter> */}
    </Card>
  )
}

function PledgeCard({ slug }: { slug: string }) {
  return (
    <Card className='text-white'>
      <CardContent className='p-6'>
        <CardTitle className='text-xl mb-2'>Pledge a higher amount</CardTitle>
        <p className='mb-4'>
          Pledge the amount higher than the biggest reward, just because the project speaks to you.
        </p>
        <div className='flex items-center gap-2'>
          <Input type='number' placeholder='10' className='w-24' />
          <ConfirmInterestButton slug={slug} className='min-w-[146px]' />
        </div>
      </CardContent>
    </Card>
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
