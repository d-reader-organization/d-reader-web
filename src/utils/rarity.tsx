import { CommonRarityIcon } from '@/components/icons/rarity/CommonRarityIcon'
import { EpicRarityIcon } from '@/components/icons/rarity/EpicRarityIcon'
import { LegendaryRarityIcon } from '@/components/icons/rarity/LegendaryRarityIcon'
import { RareRarityIcon } from '@/components/icons/rarity/RareRarityIcon'
import { UncommonRarityIcon } from '@/components/icons/rarity/UncommonRarityIcon'
import { ComicRarity } from '@/enums/comicRarity'

export const getRarityIcon = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common':
      return <CommonRarityIcon />
    case 'uncommon':
      return <UncommonRarityIcon />
    case 'rare':
      return <RareRarityIcon />
    case 'epic':
      return <EpicRarityIcon />
    case 'legendary':
      return <LegendaryRarityIcon />
    default:
      return <CommonRarityIcon />
  }
}

// had to split this in two functions so tailwind knows about color classes at build time
export const getRarityColor = (rarity: ComicRarity) => {
  switch (rarity) {
    case ComicRarity.Common:
      return 'bg-yellow-50'
    case ComicRarity.Uncommon:
      return 'bg-yellow-200'
    case ComicRarity.Rare:
      return 'bg-orange-100'
    case ComicRarity.Epic:
      return 'bg-orange-200'
    case ComicRarity.Legendary:
      return 'bg-orange-300'
  }
}

export const getRarityTextColor = (rarity: ComicRarity) => {
  switch (rarity) {
    case ComicRarity.Common:
      return 'text-yellow-50'
    case ComicRarity.Uncommon:
      return 'text-yellow-200'
    case ComicRarity.Rare:
      return 'text-orange-100'
    case ComicRarity.Epic:
      return 'text-orange-200'
    case ComicRarity.Legendary:
      return 'text-orange-300'
  }
}
