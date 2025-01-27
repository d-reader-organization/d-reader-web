import { ComicRarity } from '@/enums/comicRarity'
import { ComicIssue } from '../comicIssue'
import { Comic } from '.'

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
  comicTitle?: string
  comicIssueTitle?: string
}

export type BasicCollectibleComic = Pick<
  CollectibleComic,
  'address' | 'image' | 'name' | 'isUsed' | 'isSigned' | 'rarity'
> & {
  comicTitle: Comic['title']
  comicIssueTitle: ComicIssue['title']
  episodeNumber: ComicIssue['number']
}

export type OwnedCollectibleComic = {
  id: number
  number: number
  title: string
  slug: string
  cover: string
  collectibles: CollectibleComic[]
  ownedCopiesCount: number
}
