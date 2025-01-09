import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: number
}

export const ProgressBar: React.FC<Props> = ({ className, value }) => (
  <div className={cn('w-full bg-grey-400 rounded-full h-2', className)}>
    <div className='bg-yellow-300 h-2 rounded-full' style={{ width: `${value}%` }}></div>
  </div>
)
