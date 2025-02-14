import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

export const SignedUpChip: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'bg-grey-400 rounded-lg px-2')}>
      <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100'>
        Signed up
      </Text>
    </div>
  )
}
