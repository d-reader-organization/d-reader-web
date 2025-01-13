import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import React from 'react'
import MintIcon from 'public/assets/vector-icons/mint-icon.svg'
import UsedIcon from 'public/assets/vector-icons/used-icon.svg'
import SignedIcon from 'public/assets/vector-icons/signed-icon.svg'

type Props = {
  state: 'mint' | 'signed' | 'used'
  text?: string
} & React.HTMLAttributes<HTMLDivElement>

export const StateChip: React.FC<Props> = ({ className, state, text }) => (
  <div
    className={cn(
      'rounded-lg flex justify-center items-center gap-1 h-7 bg-green-100 p-1.5',
      !!text ? '' : 'border-2 border-grey-600',
      state === 'mint' ? 'bg-green-100' : '',
      state === 'signed' ? 'bg-purple-100' : '',
      state === 'used' ? 'bg-blue-100' : '',
      className
    )}
    title={state}
  >
    {state === 'mint' ? <MintIcon className='text-black' /> : null}
    {state === 'signed' ? <SignedIcon className='text-black' /> : null}
    {state === 'used' ? <UsedIcon className='text-black' /> : null}
    {!!text ? (
      <Text as='span' styleVariant='body-small' fontWeight='semibold' className='font-obviouslyNarrow text-black mt-1'>
        {text}
      </Text>
    ) : null}
  </div>
)
