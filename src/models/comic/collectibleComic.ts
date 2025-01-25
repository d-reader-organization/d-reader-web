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
  comicName?: string // TODO: rename this to comicTitle
  comicIssueName?: string // TODO: rename this to comicIssueTitle
}

export type BasicCollectibleComic = Pick<
  CollectibleComic,
  'address' | 'image' | 'name' | 'isUsed' | 'isSigned' | 'rarity'
> & {
  comicTitle: Comic['title']
  comicIssueTitle: ComicIssue['title']
  episodeNumber: ComicIssue['number']
}
