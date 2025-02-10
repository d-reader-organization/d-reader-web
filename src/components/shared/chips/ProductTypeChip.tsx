import { Text } from '@/components/ui'
import { ProductType } from '@/enums/productType'
import { cn } from '@/lib/utils'
import { getProductTypeColor, getProductTypeIcon, getProductTypeTextColor } from '@/utils/productType'
import React from 'react'

type Props = {
  type: ProductType
} & React.HTMLAttributes<HTMLDivElement>

export const ProductTypeChip: React.FC<Props> = ({ className, type }) => {
  const Icon = getProductTypeIcon(type)

  return (
    <div
      className={cn(
        'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min',
        getProductTypeColor(type),
        getProductTypeTextColor(type),
        className
      )}
    >
      <div className='flex items-center justify-center gap-2'>
        <Icon className='size-3.5' />
        <Text
          as='span'
          styleVariant='body-xsmall'
          fontWeight='semibold'
          className='font-obviouslyNarrow mt-1 whitespace-nowrap'
        >
          {type.toUpperCase()}
        </Text>
      </div>
    </div>
  )
}
