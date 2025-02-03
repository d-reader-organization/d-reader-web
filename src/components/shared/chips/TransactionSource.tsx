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

export const TransactionSourceChip: React.FC<Props> = ({ className, source }) => (
  <div
    className={cn(
      'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min',
      getTransactionSourceColor(source),
      className
    )}
  >
    <div className='flex items-center justify-center'>
      <div className='flex flex-wrap w-2.5 h-auto mr-2 text-white'>{getTransactionSourceIcon(source)}</div>
      <Text
        as='span'
        styleVariant='body-xsmall'
        fontWeight='semibold'
        className={cn('font-obviouslyNarrow mt-1 whitespace-nowrap', getTransactionSourceTextColor(source))}
      >
        {source.toUpperCase()}
      </Text>
    </div>
  </div>
)
