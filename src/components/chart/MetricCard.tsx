'use client'

import CountUp from '../shared/CountUp'
import { VariantSvgIconProps } from '@/lib/types'

type Props = {
  Icon: React.FC<VariantSvgIconProps>
  title: string
  value: number
}

export const MetricCard: React.FC<Props> = ({ Icon, title, value = 0 }) => {
  // if value is 1000, it's length is 4, and animation will last 2 seconds
  const animationDuration = value.toString().length / 3 || 0

  return (
    <div className='flex items-center gap-4 rounded-lg bg-zinc-900 p-4'>
      <div className='rounded-lg bg-zinc-800 p-2'>
        <Icon className='h-6 w-6' solid />
      </div>
      <div>
        <p className='text-sm text-zinc-400'>{title}</p>
        <p className='text-2xl font-semibold'>
          <CountUp value={value} duration={animationDuration} />
        </p>
      </div>
    </div>
  )
}

export default MetricCard
