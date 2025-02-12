import React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import { SignedIcon } from '@/components/icons/digital-asset/SignedIcon'
import { UnsignedIcon } from '@/components/icons/digital-asset/UnsignedIcon'

type Props = {
  signed: boolean
  border?: boolean
  compact?: boolean
  compactOnMobile?: boolean
  hideSecondaryTrait?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const SignedTraitChip: React.FC<Props> = ({
  signed,
  className,
  border = false,
  compact = false,
  compactOnMobile = false,
  hideSecondaryTrait = false,
}) => {
  const text = signed ? 'SIGNED' : 'UNSIGNED'
  const title = signed ? 'This asset is signed by the creator' : 'This asset is not signed by the creator'
  const Icon = signed ? SignedIcon : UnsignedIcon

  // only display the Chip if the asset is signed
  if (hideSecondaryTrait && !signed) return null

  return (
    <div
      className={cn(
        'p-1.5 flex items-center justify-center gap-1 rounded-lg text-black h-7',
        signed ? 'bg-purple-100' : 'bg-grey-100',
        border && 'border-2 border-black',
        compact && 'w-7',
        compactOnMobile && 'max-lg:w-7',
        className
      )}
      title={compact || compactOnMobile ? title : ''}
    >
      <Icon className='size-3.5' />
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
