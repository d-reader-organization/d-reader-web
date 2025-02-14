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
  toggleExpressedInterestDialog: VoidFunction
  ref?: string | null
}

export function RewardCard({
  title,
  price,
  description,
  imageUrl,
  project,
  toggleExpressedInterestDialog,
}: RewardCardProps) {
  const searchParams = useSearchParams()
  const ref = searchParams.get(REFERRAL_CODE_KEY)

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
              // TODO: this should be "is higher"?
              isUserInterested={isEqual(project.funding.expressedAmount, price)}
              className='min-w-[146px]'
              amount={price}
              // ALSO: why do we need the referral code here?
              referralCode={ref}
              // ALSO: why are we sending the toggle function as a prop? Why isn't the dialog living within the button? or why aren't we passing 'onClick'
              toggleExpressedInterestDialog={toggleExpressedInterestDialog}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
