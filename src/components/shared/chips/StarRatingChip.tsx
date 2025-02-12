import { StarIcon } from '@/components/icons/theme/StarIcon'
import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  rating?: number | null
} & React.HTMLAttributes<HTMLDivElement>

export const StarRatingChip: React.FC<Props> = ({ className, rating }) => {
  return (
    <div
      className={cn(
        'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min ',
        'bg-yellow-200 text-yellow-200',
        className
      )}
    >
      <div className='flex items-center justify-center gap-2'>
        <StarIcon className='size-3.5' solid />
        <Text
          as='span'
          styleVariant='body-xsmall'
          fontWeight='semibold'
          className='font-obviouslyNarrow mt-1 whitespace-nowrap'
        >
          {rating || 'N/A'}
        </Text>
      </div>
    </div>
  )
}
