import { Text } from '@/components/ui'
import { TransactionSource } from '@/enums/transactionSource'
import { cn } from '@/lib/utils'
import {
  getTransactionSourceColor,
  getTransactionSourceIcon,
  getTransactionSourceTextColor,
} from '@/utils/transactionSource'
import React from 'react'

type Props = {
  source: TransactionSource
} & React.HTMLAttributes<HTMLDivElement>

export const TransactionSourceChip: React.FC<Props> = ({ className, source }) => {
  const Icon = getTransactionSourceIcon(source)

  return (
    <div
      className={cn(
        'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min',
        getTransactionSourceColor(source),
        className
      )}
    >
      <div className='flex items-center justify-center gap-2'>
        <Icon className='size-3.5' solid />
        <Text
          as='span'
          styleVariant='body-xsmall'
          fontWeight='semibold'
          className='font-obviouslyNarrow mt-1 whitespace-nowrap'
        >
          {source.toUpperCase()}
        </Text>
      </div>
    </div>
  )
}
