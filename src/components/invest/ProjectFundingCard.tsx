'use client'

import React from 'react'
import Link from 'next/link'
import { ExpressInterest, Project } from '@/models/project'
import { formatCurrency, formatNumberWithCommas } from '@/utils/numbers'
import { differenceInDays } from 'date-fns'
import { Progress } from '../ui/Progress'
import { toast } from '../ui/toast'
import { Text } from '../ui/Text'
import { cn, withRedirect } from '@/lib/utils'
import { RoutePath } from '@/enums/routePath'
import { RequireAuthWrapperButton } from '../shared/buttons/RequireAuthWrapperButton'
import { redirect, RedirectType, useSearchParams } from 'next/navigation'
import { REFERRAL_CODE_KEY } from '@/constants/general'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { useToggle } from '@/hooks'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { TokenIcon } from '../icons/logo/TokenIcon'
import { ButtonLink } from '../ui/ButtonLink'
import { ProjectCreatorSection } from '../shared/ProjectCreatorSection'
import { track } from '@vercel/analytics/react'
import { CountUp } from '../shared/CountUp'
import { AnimatedProgress } from '../shared/AnimatedProgress'

type ProjectFundingCardProps = {
  isAuthenticated: boolean
  project: Project
} & React.HTMLAttributes<HTMLDivElement>

// TODO (Matan): redesign and refactor the whole component
export const ProjectFundingCard: React.FC<ProjectFundingCardProps> = ({ isAuthenticated, className, project }) => {
  const currentDate = new Date()
  const { funding, slug } = project
  const startedAt = funding.startDate ? new Date(funding.startDate) : undefined
  // const hasFundingStarted = startedAt ? startedAt <= currentDate : false
  // const hasFundingEnded = funding.pledgedAmount >= funding.raiseGoal
  // const daysLeft = funding.endDate ? differenceInDays(new Date(funding.endDate), currentDate) : undefined

  return (
    <div className={cn('flex flex-col gap-6 p-2 pt-0 w-full', className)}>
      <div className='flex flex-col gap-4 w-full'>
        <Text as='p' styleVariant='body-normal' fontWeight='bold'>
          Overall project fund goal:
        </Text>
        <AnimatedProgress
          durationInSeconds={3}
          value={Math.min(1, (funding.pledgedAmount + 50000) / funding.raiseGoal) * 100}
        />
        {/* Contributors and pledges section */}
        <section className='flex flex-col gap-2 sm:flex-row w-full sm:justify-between'>
          <div className='flex flex-col'>
            <CountUp
              className='text-24 sm:text-32 tracking-0064 font-semibold leading-tight font-obviouslyNarrow text-green-genesis'
              durationInSeconds={3}
              value={funding.pledgedAmount}
            />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              pledged of&nbsp;{formatCurrency({ value: funding.raiseGoal, fractionDigits: 0 })}
            </Text>
          </div>
          <div className='flex flex-col'>
            <Text as='h3' styleVariant='primary-heading' className='text-white'>
              {formatNumberWithCommas(funding.numberOfInterestedInvestors)}&nbsp;contributors
            </Text>
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              expressed interests
            </Text>
          </div>
        </section>
      </div>
      <ProjectCreatorSection creator={project.creator} />
      <ButtonLink
        href={RoutePath.Pledge(project.slug)}
        variant='genesis'
        onClick={() => track('Express Interest Click')}
      >
        Express Interest
      </ButtonLink>
    </div>
  )
}

type FundingStatsProps = {
  text: string
  value: number | string
  valueColor?: string
  valueSizeMd?: string
  textSizeMd?: string
} & React.HTMLAttributes<HTMLDivElement>

const FundingStats: React.FC<FundingStatsProps> = ({ text, value, valueColor = 'text-white', className }) => {
  return (
    <div className={cn('flex flex-col w-1/3 max-md:pt-[2px] md:w-full md:gap-1', className)}>
      <Text
        as='h3'
        styleVariant='primary-heading'
        className={cn(
          'sm:text-20 max-md:text-20 max-md:leading-tight max-md:tracking-normal md:text-32 md:leading-8',
          valueColor
        )}
      >
        {value}
      </Text>
      <Text
        as='p'
        styleVariant='body-normal'
        fontWeight='medium'
        className='text-grey-100 leading-none max-md:text-xs md:leading-snug'
      >
        {text}
      </Text>
    </div>
  )
}

const FundingEndedButton: React.FC = () => {
  return (
    <Link
      href='#'
      className='flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch text-grey-600 rounded-xl bg-green-genesis hover:brightness-100 md:p-4'
    >
      <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-grey-600 leading-snug max-md:text-base'>
        Fully backed
      </Text>
    </Link>
  )
}

type InvestButtonProps = {
  isAuthenticated: boolean
  slug: string
}

const InvestButton: React.FC<InvestButtonProps> = ({ isAuthenticated, slug }) => {
  const href = isAuthenticated ? RoutePath.InvestCheckout(slug) : withRedirect(RoutePath.InvestCheckout(slug))

  return (
    <Link
      href={href}
      className='flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch text-grey-600 rounded-xl bg-green-genesis hover:brightness-100 md:p-4'
    >
      <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-grey-600 leading-snug max-md:text-base'>
        Back this project
      </Text>
    </Link>
  )
}

type ExpressInterestButtonProps = {
  slug: string
  defaultPrice: number
  isUserInterested?: boolean
}

const ExpressInterestButton: React.FC<ExpressInterestButtonProps> = ({ slug, isUserInterested, defaultPrice }) => {
  const searchParams = useSearchParams()
  const referralCode = searchParams.get(REFERRAL_CODE_KEY)
  const [showLoader, toggleLoader] = useToggle()

  const handleExpressInterest = async () => {
    toggleLoader()
    const request: ExpressInterest = { expressedAmount: defaultPrice, ref: referralCode }
    const { errorMessage } = await expressInterest({ slug, request })
    toggleLoader()

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
      return
    }
    redirect(`${RoutePath.Pledge(slug)}`, RedirectType.replace)
  }
  const text = isUserInterested ? `🔔 I'm interested` : 'Express interest'
  return isUserInterested ? (
    <ButtonLink href={RoutePath.Pledge(slug)} className='border-2 border-white border-opacity-100'>
      {text}
    </ButtonLink>
  ) : (
    <RequireAuthWrapperButton
      Icon={showLoader ? LoaderIcon : undefined}
      onClick={handleExpressInterest}
      className={cn(
        'flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch rounded-xl md:p-4',
        isUserInterested
          ? 'text-white bg-grey-500 border-2 border-white'
          : 'text-grey-600 bg-green-genesis border-green-300 hover:brightness-100'
      )}
    >
      {text}
    </RequireAuthWrapperButton>
  )
}
