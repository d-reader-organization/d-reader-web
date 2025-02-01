'use client'

import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import MetricCard from './MetricCard'
import MetricChart from './MetricChart'
import { MoneyPouchIcon } from '@/components/icons/theme/MoneyPouchIcon'
import { RoyaltyIcon } from '@/components/icons/theme/RoyaltyIcon'
import { CoinsIcon } from '@/components/icons/theme/CoinsIcon'
import { ChevronDown } from '@/components/icons/theme/ChevronDown'

enum ChartsTab {
  Audience = 'Audience',
  Revenue = 'Revenue',
  Collectors = 'Collectors',
}

export const CreatorMetrics: React.FC = () => {
  const [tab, setTab] = useState<ChartsTab>(ChartsTab.Audience)

  return (
    <div className='w-full'>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === ChartsTab.Audience ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Audience)}
              className='h-8 font-bold'
            >
              {ChartsTab.Audience}
            </Button>
            <Button
              variant={tab === ChartsTab.Revenue ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Revenue)}
              className='h-8 font-bold'
            >
              {ChartsTab.Revenue}
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
              <MetricCard Icon={MoneyPouchIcon} title='Total sales' value={285342} />
              <MetricCard Icon={RoyaltyIcon} title='Total royalties' value={25342} />
              <MetricCard Icon={CoinsIcon} title='Other' value={2342} />
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
