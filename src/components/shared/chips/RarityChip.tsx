import { Text } from '@/components/ui'
import { ComicRarity } from '@/enums/comicRarity'
import { cn } from '@/lib/utils'
import { getRarityColor } from '@/utils/rarity'
import RarityIcon from 'public/assets/vector-icons/rarity-icon.svg'
import React from 'react'

type Props = {
  rarity: ComicRarity
  supply?: number
  border?: boolean
  compact?: boolean
  compactOnMobile?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RarityChip: React.FC<Props> = ({
  className,
  rarity,
  supply,
  border = false,
  compact = false,
  compactOnMobile = false,
}) => {
  const title = 'This asset is ' + rarity + ' rarity'

  // only display the Chip if the asset has rarity
  if (!rarity || rarity === ComicRarity.None) return null

  return (
    <div
      className={cn(
        'p-1.5 flex items-center justify-center gap-1 rounded-lg text-black h-7',
        getRarityColor(rarity),
        border && 'border-2 border-black',
        compact && 'w-7',
        compactOnMobile && 'max-md:w-7',
        className
      )}
      title={compact ? title : ''}
    >
      <div className='flex items-center justify-center'>
        <RarityIcon className='w-3 h-auto' />
        <Text
          as='span'
          styleVariant='body-small'
          fontWeight='semibold'
          className={cn('font-obviouslyNarrow ml-0.5 -mb-0.5', compact && 'hidden', compactOnMobile && 'max-md:hidden')}
        >
          {rarity.toUpperCase()}
        </Text>
      </div>
      {supply ? (
        <Text as='span' styleVariant='body-xsmall' fontWeight='bold' className='text-xxs'>
          x{supply}
        </Text>
      ) : null}
    </div>
  )
}
