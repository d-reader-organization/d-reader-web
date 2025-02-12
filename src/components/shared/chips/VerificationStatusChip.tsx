import { CheckCircleIcon } from '@/components/icons/theme/CheckCircleIcon'
import { XCircleIcon } from '@/components/icons/theme/XCircleIcon'
import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  isVerified: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const VerificationStatusChip: React.FC<Props> = ({ className, isVerified }) => {
  const Icon = isVerified ? CheckCircleIcon : XCircleIcon

  return (
    <div
      className={cn(
        'py-2 px-4 flex items-center justify-center gap-1 rounded-lg h-6 bg-opacity-10 w-min',
        isVerified ? 'bg-green-300' : 'bg-yellow-300',
        isVerified ? 'text-green-300' : 'text-yellow-300',
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
          {isVerified ? 'VERIFIED' : 'IN REVIEW'}
        </Text>
      </div>
    </div>
  )
}
