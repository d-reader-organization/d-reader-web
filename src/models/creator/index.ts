import { CreatorStats } from './creatorStats'
import { CreatorMyStats } from './creatorMyStats'

export interface BasicCreator {
  id: number
  handle: string
  displayName: string
  isVerified: boolean
  avatar: string
  banner: string
  description: string
  tippingAddress: string
  website: string
  twitter: string
  instagram: string
  linktree: string
  userId: number
}

export interface Creator extends BasicCreator {
  stats: CreatorStats
  myStats?: CreatorMyStats
}

export type UpdateCreatorData = Partial<
  Pick<Creator, 'description' | 'tippingAddress' | 'website' | 'twitter' | 'instagram' | 'linktree'>
>

export type UpdateCreatorFilesData = Partial<{
  avatar: File
  banner: File
  logo: File
}>

export type SearchResultCreator = Pick<Creator, 'id' | 'avatar' | 'displayName' | 'handle'> & { issuesCount: number }

export type FollowCreator = Pick<Creator, 'id'>
