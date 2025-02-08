'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import MetricCard from './MetricCard'
import MetricChart from './MetricChart'
import { MoneyPouchIcon } from '@/components/icons/theme/MoneyPouchIcon'
import { RoyaltyIcon } from '@/components/icons/theme/RoyaltyIcon'
import { CoinsIcon } from '@/components/icons/theme/CoinsIcon'
import { useTableTabs } from '@/hooks/useTableTabs'
import { useTableSelect } from '@/hooks/useTableSelect'
import { SELECT_OPTIONS } from '@/constants/general'

enum ChartsTab {
  Audience = 'Audience',
  Revenue = 'Revenue',
  // Collectors = 'Collectors',
}

export const CreatorMetrics: React.FC = () => {
  const { TableTabs } = useTableTabs([ChartsTab.Audience, ChartsTab.Revenue])
  const { TableSelect } = useTableSelect(SELECT_OPTIONS.CHART_DATE)

  return (
    <div className='w-full'>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <TableTabs />
          <TableSelect />
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
