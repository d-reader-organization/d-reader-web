import { RoutePath } from '@/enums/routePath'
import Image from 'next/image'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip'
import { ChevronRightIcon } from '@/components/icons/theme/ChevronRightIcon'
import { InfoIcon } from '@/components/icons/theme/InfoIcon'
import { roiTooltip } from '@/constants/tooltips'
import { formatCurrency } from '@/utils/numbers'
import { Text } from '../ui'
import { ButtonLink } from '../ui/ButtonLink'
import { SuccessfulCampaign } from '@/constants/projects'

type Props = {
  campaigns: SuccessfulCampaign[]
  title: string
}

export const ProjectsSection: React.FC<Props> = ({ campaigns, title }) => {
  return (
    <div className='flex flex-col gap-4 md:gap-10 md:my-10'>
      <Text as='h3' styleVariant='primary-heading'>
        {title}
      </Text>
      <div className='max-md:py-2 flex 1160:grid overflow-x-auto 1160:overflow-x-visible grid-cols-4 gap-4 md:gap-6 lg:gap-10'>
        {campaigns.map((campaign) => (
          <Card campaign={campaign} key={campaign.slug} />
        ))}
      </div>
    </div>
  )
}

type CardProps = {
  campaign: SuccessfulCampaign
}

const Card: React.FC<CardProps> = ({ campaign }) => (
  <div className='bg-grey-500 flex flex-col items-center gap-4 md:gap-[30px] p-4 md:p-6 pt-4 rounded-xl min-w-[260px] max-w-[260px] md:max-w-[354px]'>
    <div className='flex items-center max-h-[84px] h-full'>
      <Image
        alt=''
        src={campaign.banner}
        className='max-h-[84px] h-full object-cover p-1 w-auto'
        width={306}
        height={84}
      />
    </div>
    <RoiWidget roi={campaign.payout.roiPercent} tooltipText={roiTooltip(campaign.payout.roiPercent)} />
    <div className='flex justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center'>
      <InvestmentStatsBox
        title='REVENUE'
        value={formatCurrency({ value: campaign.payout.revenue, fractionDigits: 0 })}
      />
      <InvestmentStatsBox title='BUYERS' value={campaign.payout.numberOfBuyers} />
    </div>
    <p className='text-sm md:text-base font-bold leading-normal md:leading-[22.4px] text-center'>
      Profitability achieved {campaign.payout?.daysForRoi} days after the production started {/* offering closed. */}
    </p>
    <ButtonLink
      href={RoutePath.Payout(campaign.slug)}
      prefetch={false}
      Icon={ChevronRightIcon}
      iconPosition='right'
      className='w-full'
      subVariant={2}
    >
      Learn more
    </ButtonLink>
  </div>
)

const RoiWidget: React.FC<{ roi: number; tooltipText: string }> = ({ roi, tooltipText }) => (
  <div className='flex justify-center items-center p-3 gap-2 md:gap-3 bg-grey-600 rounded-xl max-h-[60px] md:max-h-12 max-w-[240px]'>
    <p className='text-base md:text-[32px] font-bold leading:[22.4px] md:leading-8'>{roi}%</p>
    <div className='flex items-center gap-2 md:gap-3'>
      <p className='text-[10px] md:text-xs font-bold leading-normal text-grey-100'>RETURN ON INVESTMENT</p>
      <InfoTooltip text={tooltipText} />
    </div>
  </div>
)

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider>
    <Tooltip delayDuration={10}>
      <TooltipTrigger>
        <InfoIcon className='text-green-genesis size-[10px] md:size-4.5' />
      </TooltipTrigger>
      <TooltipContent align='start' className='max-w-80' side='right'>
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

type InvestmentStatsBoxProps = {
  title: string
  value: string | number
}

const InvestmentStatsBox: React.FC<InvestmentStatsBoxProps> = ({ title, value }) => (
  <div className='flex flex-col justify-center items-center'>
    <p className='text-xs font-bold text-grey-100'>{title}</p>
    <p className='text-base font-bold leading-[22.4px]'>{value}</p>
  </div>
)
