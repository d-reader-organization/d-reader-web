'use client'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { type PropsWithChildren } from 'react'
import { RewardSection } from './RewardSection'
import { ReferPerson } from './Referral'
import { track } from '@vercel/analytics/react'
import { Campaign } from '@/models/campaign'

type Props = { campaign: Campaign; twitterIntent?: string; username?: string } & Pick<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
>

export const KickstarterTabs: React.FC<Props> = ({ className, campaign, twitterIntent, username }) => {
  return (
    <Tabs
      defaultValue='about'
      className={className}
      onValueChange={(tab: string) => {
        track(`Kickstarter tab change: ${tab}`)
      }}
    >
      <TabsList className='border-b border-b-grey-300 w-full justify-center md:justify-start'>
        <TabTrigger title='About' />
        <TabTrigger title='Rewards' />
        <TabTrigger disabled title='FAQ' />
        <TabTrigger disabled title='Updates' />
      </TabsList>
      <TabContent value='about'>
        {/* TODO: update info to show .md file */}
        {/* <ProjectInfo info={campaign.info} /> */}
      </TabContent>
      <TabContent value='rewards' className='flex flex-col gap-4 max-md:items-center md:flex-row md:gap-7'>
        <RewardSection campaign={campaign} viewOnly />
        {!!twitterIntent && !!username ? (
          <ReferPerson campaignSlug={campaign.slug} twitterIntent={twitterIntent} username={username} />
        ) : null}
      </TabContent>
      <TabContent value='faq'></TabContent>
      <TabContent value='updates'></TabContent>
    </Tabs>
  )
}

const TabTrigger: React.FC<{ disabled?: boolean; title: string }> = ({ disabled = false, title }) => (
  <TabsTrigger
    className='text-grey-200 data-[state=active]:text-white px-3 py-2 md:px-3 md:py-3'
    value={title.toLowerCase()}
    disabled={disabled}
  >
    {title}
  </TabsTrigger>
)

type TabContentProps = {
  value: string
} & PropsWithChildren &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>

const TabContent: React.FC<TabContentProps> = ({ className, value, children }) => (
  <TabsContent value={value} className={cn('max-xl:pb-4 pt-2 flex', className)}>
    {children}
  </TabsContent>
)
