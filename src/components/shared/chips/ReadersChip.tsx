import { UsersIcon } from '@/components/icons/theme/UsersIcon'
import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  count: number
} & React.HTMLAttributes<HTMLDivElement>

export const ReadersChip: React.FC<Props> = ({ className, count }) => {
  return (
    <div
      className={cn(
        'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min ',
        'bg-slate-300 text-slate-300',
        className
      )}
    >
      <div className='flex items-center justify-center gap-2'>
        <UsersIcon className='size-3.5' solid />
        <Text
          as='span'
          styleVariant='body-xsmall'
          fontWeight='semibold'
          className='font-obviouslyNarrow mt-1 whitespace-nowrap'
        >
          {count}
        </Text>
      </div>
    </div>
  )
}
