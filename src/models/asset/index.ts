import { ComicRarity } from '@/enums/comicRarity'

export interface Asset {
  address: string
  uri: string
  image: string
  name: string
  description: string
  ownerAddress: string
  royalties: number
  isUsed: boolean
  isSigned: boolean
  comicTitle: string
  comicIssueTitle: string
  comicIssueId: number
  isListed: boolean
  rarity: ComicRarity
}
