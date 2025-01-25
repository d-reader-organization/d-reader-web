import { Text } from '@/components/ui'
import { ProductType } from '@/enums/productType'
import { cn } from '@/lib/utils'
import { getProductTypeColor, getProductTypeIcon, getProductTypeTextColor } from '@/utils/productType'
import React from 'react'

type Props = {
  type: ProductType
} & React.HTMLAttributes<HTMLDivElement>

export const ProductTypeChip: React.FC<Props> = ({ className, type }) => (
  <div
    className={cn(
      'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min',
      getProductTypeColor(type),
      className
    )}
  >
    <div className='flex items-center justify-center'>
      <div className='flex flex-wrap w-2.5 h-auto mr-2'>{getProductTypeIcon(type)}</div>
      <Text
        as='span'
        styleVariant='body-xsmall'
        fontWeight='semibold'
        className={cn('font-obviouslyNarrow mt-1 whitespace-nowrap', getProductTypeTextColor(type))}
      >
        {type.toUpperCase()}
      </Text>
    </div>
  </div>
)
