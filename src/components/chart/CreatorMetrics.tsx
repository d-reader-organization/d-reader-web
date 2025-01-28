'use client'

import { Button } from '@/components/ui/Button'
import { ChevronDown, Coins, Crown, DollarSign } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import MetricCard from './MetricCard'
import MetricChart from './MetricChart'

enum ChartsTab {
  Revenue = 'Revenue',
  Collectors = 'Collectors',
  Followers = 'Followers',
}

export const CreatorMetrics: React.FC = () => {
  const [tab, setTab] = useState<ChartsTab>(ChartsTab.Revenue)

  return (
    <div className='w-full max-w-screen-lg'>
      <div className='w-full max-w-screen-lg space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === ChartsTab.Revenue ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Revenue)}
              className='h-8 font-bold'
            >
              {ChartsTab.Revenue}
            </Button>
            <Button
              variant={tab === ChartsTab.Followers ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Followers)}
              className='h-8 font-bold'
            >
              {ChartsTab.Followers}
            </Button>
            <Button
              variant={tab === ChartsTab.Collectors ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Collectors)}
              className='h-8 font-bold'
            >
              {ChartsTab.Collectors}
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              className='w-max min-w-10 sm:px-2 rounded-lg flex justify-center items-center gap-2'
              size='md'
            >
              <span className='max-md:hidden'>Last 30 days</span>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <Card className='border-0 text-white'>
          <CardContent className='p-6'>
            <div className='mb-8 grid gap-4 md:grid-cols-3'>
              <MetricCard icon={DollarSign} title='Total sales' value={285342} />
              <MetricCard icon={Crown} title='Total royalties' value={25342} />
              <MetricCard icon={Coins} title='Other' value={2342} />
            </div>
            <div className='h-[400px]'>
              <MetricChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreatorMetrics
