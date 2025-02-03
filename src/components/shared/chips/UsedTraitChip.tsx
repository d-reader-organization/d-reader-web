import React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import { UsedIcon } from '@/components/icons/digital-asset/UsedIcon'
import { MintIcon } from '@/components/icons/digital-asset/MintIcon'

type Props = {
  used: boolean
  border?: boolean
  compact?: boolean
  compactOnMobile?: boolean
  hideSecondaryTrait?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const UsedTraitChip: React.FC<Props> = ({
  used,
  className,
  border = false,
  compact = false,
  compactOnMobile = false,
  hideSecondaryTrait = false,
}) => {
  const text = used ? 'USED' : 'MINT'
  const title = used ? 'This asset is unwrapped' : 'This asset is in Mint condition'
  const Icon = used ? UsedIcon : MintIcon

  // only display the Chip if the asset is not used
  if (hideSecondaryTrait && !!used) return null

  return (
    <div
      className={cn(
        'p-1.5 flex items-center justify-center gap-1 rounded-lg text-black h-7',
        used ? 'bg-blue-100' : 'bg-green-100',
        border && 'border-2 border-black',
        compact && 'w-7',
        compactOnMobile && 'max-lg:w-7',
        className
      )}
      title={compact || compactOnMobile ? title : ''}
    >
      <Icon className='w-3 h-auto' />
      <Text
        as='span'
        styleVariant='body-small'
        fontWeight='semibold'
        className={cn('font-obviouslyNarrow ml-0.5 -mb-0.5', compact && 'hidden', compactOnMobile && 'max-lg:hidden')}
      >
        {text}
      </Text>
    </div>
  )
}
