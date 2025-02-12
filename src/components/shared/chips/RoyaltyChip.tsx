import { Text } from '@/components/ui'
import React from 'react'

type Props = {
  royalty: number
} & React.HTMLAttributes<HTMLDivElement>

export const RoyaltyChip: React.FC<Props> = ({ royalty }) => (
  <div className='h-7 bg-grey-50 rounded-lg p-2 flex justify-center items-center'>
    <Text as='span' styleVariant='body-small' fontWeight='semibold' className='font-obviouslyNarrow text-black mt-1'>
      {royalty}%&nbsp;ROYALTY
    </Text>
  </div>
)
