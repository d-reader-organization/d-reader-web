'use client'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { ProjectInfo } from './ProjectInfo'
import { type Project } from '@/models/project'
import { type PropsWithChildren } from 'react'
import { RewardSection } from './RewardSection'

type Props = { project: Project } & Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>

export const KickstarterTabs: React.FC<Props> = ({ className, project }) => {
  return (
    <Tabs defaultValue='about' className={cn('', className)}>
      <TabsList className='border-b border-b-grey-300 w-full justify-start'>
        <TabTrigger title='About' />
        <TabTrigger title='Rewards' />
        <TabTrigger disabled title='FAQ' />
        <TabTrigger disabled title='Updates' />
      </TabsList>
      <TabContent value='about'>
        <ProjectInfo info={project.info} />
      </TabContent>
      <TabContent value='rewards'>
        <RewardSection project={project} viewOnly />
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
} & PropsWithChildren

const TabContent: React.FC<TabContentProps> = ({ value, children }) => (
  <TabsContent value={value} className='pt-4 flex'>
    {children}
  </TabsContent>
)
