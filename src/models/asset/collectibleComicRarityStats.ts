import { ComicRarity } from '@/enums/comicRarity'

export interface CollectibleComicRarityStats {
  image: string
  used: number
  signed: number
  rarity: ComicRarity
}
