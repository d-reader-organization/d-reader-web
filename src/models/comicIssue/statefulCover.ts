import { ComicRarity } from '@/enums/comicRarity'

export interface StatefulCover {
  artist: string
  isSigned: boolean
  isUsed: boolean
  rarity: ComicRarity
  image: string
}
