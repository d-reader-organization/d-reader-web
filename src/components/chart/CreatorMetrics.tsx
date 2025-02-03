'use client'

import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import MetricCard from './MetricCard'
import MetricChart from './MetricChart'
import { MoneyPouchIcon } from '@/components/icons/theme/MoneyPouchIcon'
import { RoyaltyIcon } from '@/components/icons/theme/RoyaltyIcon'
import { CoinsIcon } from '@/components/icons/theme/CoinsIcon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

enum ChartsTab {
  Audience = 'Audience',
  Revenue = 'Revenue',
  // Collectors = 'Collectors',
}

export const CreatorMetrics: React.FC = () => {
  const [tab, setTab] = useState(ChartsTab.Audience)
  const [selectedOption, setSelectedOption] = useState('1')

  return (
    <div className='w-full'>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === ChartsTab.Audience ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Audience)}
              className='h-8 font-bold w-[100px]'
            >
              {ChartsTab.Audience}
            </Button>
            <Button
              variant={tab === ChartsTab.Revenue ? 'secondary' : 'ghost'}
              onClick={() => setTab(ChartsTab.Revenue)}
              className='h-8 font-bold w-[100px]'
            >
              {ChartsTab.Revenue}
            </Button>
          </div>
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value)
            }}
          >
            <SelectTrigger variant='secondary' asChild>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1'>Last 7 days</SelectItem>
              <SelectItem value='2'>Last 30 days</SelectItem>
              <SelectItem value='3'>Last 3 months</SelectItem>
              <SelectItem value='4'>Last 6 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className='border-0 text-white'>
          <CardContent className='p-6'>
            <div className='mb-8 grid gap-4 md:grid-cols-3'>
              <MetricCard Icon={MoneyPouchIcon} title='Total sales' value={25342} />
              <MetricCard Icon={RoyaltyIcon} title='Total royalties' value={1824} />
              <MetricCard Icon={CoinsIcon} title='Other' value={1200} />
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
