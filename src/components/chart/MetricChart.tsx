'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { date: 'Aug 2024', sales: 8000, royalties: 120, other: 0 },
  { date: 'Sep 2024', sales: 14000, royalties: 420, other: 400 },
  { date: 'Oct 2024', sales: 17500, royalties: 980, other: 400 },
  { date: 'Nov 2024', sales: 20000, royalties: 1200, other: 600 },
  { date: 'Dec 2024', sales: 22000, royalties: 1620, other: 1200 },
  { date: 'Jan 2025', sales: 25342, royalties: 1824, other: 1200 },
]

const chartConfig = {
  sales: {
    label: 'Total Sales',
    color: 'hsl(var(--chart-1))',
  },
  royalties: {
    label: 'Royalties',
    color: 'hsl(var(--chart-2))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-3))',
  },
}

export function MetricChart() {
  return (
    <ChartContainer config={chartConfig} className='min-h-[240px] w-full max-h-full'>
      <AreaChart data={chartData}>
        <CartesianGrid horizontal={true} vertical={false} stroke='rgba(255,255,255,0.1)' />
        <XAxis dataKey='date' tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} dy={10} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} dx={-10} />

        <ChartTooltip content={<ChartTooltipContent />} />

        <Area
          dataKey='sales'
          type='natural'
          fill='var(--color-sales)'
          fillOpacity={0.4}
          stroke='var(--color-sales)'
          stackId='a'
        />
        <Area
          dataKey='royalties'
          type='natural'
          fill='var(--color-royalties)'
          fillOpacity={0.4}
          stroke='var(--color-royalties)'
          stackId='a'
        />
        <Area
          dataKey='other'
          type='natural'
          fill='var(--color-other)'
          fillOpacity={0.4}
          stroke='var(--color-other)'
          stackId='a'
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default MetricChart
