import React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import SignedIcon from 'public/assets/vector-icons/signed-icon.svg'

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
  const Icon = signed ? SignedIcon : SignedIcon // TODO: potentially change the icon for unsigned state

  // only display the Chip if the asset is signed
  if (hideSecondaryTrait && !signed) return null

  return (
    <div
      className={cn(
        'p-1.5 flex items-center justify-center gap-1 rounded-lg text-black h-7',
        signed ? 'bg-purple-100' : 'bg-grey-100',
        border && 'border-2 border-black',
        compact && 'w-7',
        compactOnMobile && 'max-md:w-7',
        className
      )}
      title={compact ? title : ''}
    >
      <Icon className='w-3 h-auto' />
      <Text
        as='span'
        styleVariant='body-small'
        fontWeight='semibold'
        className={cn('font-obviouslyNarrow ml-0.5 -mb-0.5', compact && 'hidden', compactOnMobile && 'max-md:hidden')}
      >
        {text}
      </Text>
    </div>
  )
}
