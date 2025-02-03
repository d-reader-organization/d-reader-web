import { ComicRarity } from '@/enums/comicRarity'

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
