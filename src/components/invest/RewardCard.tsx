'use client'

import { Project } from '@/models/project'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Text } from '../ui'
import Image from 'next/image'
import { ConfirmInterestButton } from './ConfirmInterestButton'
import { useSearchParams } from 'next/navigation'
import { REFERRAL_CODE_KEY } from '@/constants/general'
import { isEqual } from 'lodash'

type RewardCardProps = {
  title: string
  price: number
  description: string
  imageUrl: string
  project: Project
  referralCode?: string | null
}

export function RewardCard({ title, price, description, imageUrl, project }: RewardCardProps) {
  const searchParams = useSearchParams()
  const referralCode = searchParams.get(REFERRAL_CODE_KEY)

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
              isUserInterested={isEqual(project.funding.expressedAmount, price)}
              className='min-w-[146px]'
              amount={price}
              referralCode={referralCode}
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
