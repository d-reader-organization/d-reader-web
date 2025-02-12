import { Comic } from '../comic'
import { ComicIssueMyStats } from './comicIssueMyStats'
import { ComicIssueStats } from './comicIssueStats'
import { Creator } from '../creator'
import { PartialGenre } from '../genre'
import { ComicIssueCollaborator } from './comicIssueCollaborator'
import { StatefulCover } from './statefulCover'
import { StatelessCover } from './statelessCover'
import { RoyaltyWallet } from './royaltyWallet'
import { ComicIssueCollectibleInfo } from './comicIssueCollectibleInfo'

export interface BasicComicIssue {
  id: number
  number: number
  supply: number
  mintPrice: number
  title: string
  slug: string
  comicSlug: string
  description: string
  flavorText: string
  cover: string
  signature: string
  releaseDate: string
  isFreeToRead: boolean
  isFullyUploaded: boolean
  isPublished: boolean
  isPopular: boolean
  isVerified: boolean
}

export interface ComicIssue extends BasicComicIssue {
  collectibleInfo?: ComicIssueCollectibleInfo
  creator?: Pick<Creator, 'id' | 'handle' | 'displayName' | 'isVerified' | 'avatar'>
  comic?: Pick<Comic, 'title' | 'slug' | 'audienceType'>
  genres?: PartialGenre[]
  collaborators?: ComicIssueCollaborator[]
  statefulCovers?: StatefulCover[]
  statelessCovers?: StatelessCover[]
  royaltyWallets?: RoyaltyWallet[]
  stats?: ComicIssueStats
  myStats?: ComicIssueMyStats
}

export interface CreateComicIssueData
  extends Pick<
    ComicIssue,
    | 'title'
    // | 'slug'
    | 'number'
    | 'description'
    | 'flavorText'
    | 'comicSlug'
    | 'isFreeToRead'
  > {
  isFullyUploaded?: BasicComicIssue['isFullyUploaded']
  supply?: BasicComicIssue['supply']
  mintPrice?: BasicComicIssue['mintPrice']
  collaborators?: ComicIssueCollaborator[]
  royaltyWallets?: RoyaltyWallet[]
  releaseDate: Date
}

export type UpdateComicIssueData = Partial<
  Pick<
    CreateComicIssueData,
    | 'number'
    | 'supply'
    | 'mintPrice'
    | 'description'
    | 'flavorText'
    | 'releaseDate'
    | 'collaborators'
    | 'royaltyWallets'
  >
>

export type UpdateComicIssueFilesData = Partial<{
  signature: File
  pdf: File
}>

export type ComicIssueInfoProps = {
  comicIssue: ComicIssue
}
