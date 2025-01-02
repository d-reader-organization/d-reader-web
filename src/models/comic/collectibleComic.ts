import { ComicRarity } from '@/enums/comicRarity'

export type CollectibleComic = {
  address: string
  uri: string
  image: string
  name: string
  description: string
  ownerAddress: string
  royalties: number
  isUsed: boolean
  isSigned: boolean
  rarity: ComicRarity
  comicIssueId: number
  isListed: boolean
  comicName?: string
  comicIssueName?: string
}
