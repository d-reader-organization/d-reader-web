import { ComicStats } from './comicStats'
import { ComicMyStats } from './comicMyStats'
import { Creator } from '../creator'
import { PartialGenre } from '../genre'
import { AudienceType } from '@/enums/audienceType'

export interface BasicComic {
  title: string
  slug: string
  audienceType: AudienceType
  isCompleted: boolean
  isVerified: boolean
  isPublished: boolean
  isPopular: boolean
  cover: string
  banner: string
  logo: string
  description: string
  flavorText: string
  website: string
  twitter: string
  discord: string
  telegram: string
  instagram: string
  tikTok: string
  youTube: string
}

export interface Comic extends BasicComic {
  stats?: ComicStats
  myStats?: ComicMyStats
  genres?: PartialGenre[]
  creator?: Pick<Creator, 'id' | 'handle' | 'displayName' | 'isVerified' | 'avatar'>
}

export interface CreateComicData
  extends Pick<
    Comic,
    | 'title'
    // | 'slug'
    | 'isCompleted'
    | 'audienceType'
  > {
  description?: BasicComic['description']
  flavorText?: BasicComic['flavorText']
  website?: BasicComic['website']
  twitter?: BasicComic['twitter']
  discord?: BasicComic['discord']
  telegram?: BasicComic['telegram']
  instagram?: BasicComic['instagram']
  tikTok?: BasicComic['tikTok']
  youTube?: BasicComic['youTube']
  genres: string[]
  // collaborators?: ComicCollaborator[]
}

export type UpdateComicData = Partial<
  Pick<
    CreateComicData,
    | 'isCompleted'
    | 'audienceType'
    | 'description'
    | 'flavorText'
    | 'website'
    | 'twitter'
    | 'discord'
    | 'telegram'
    | 'instagram'
    | 'tikTok'
    | 'youTube'
    | 'genres'
  >
>

export type UpdateComicSocialsData = Partial<
  Pick<CreateComicData, 'website' | 'twitter' | 'discord' | 'telegram' | 'instagram' | 'tikTok' | 'youTube'>
>

export type UpdateComicFilesData = Partial<{
  cover: File
  banner: File
  logo: File
}>

export type SearchResultComic = Pick<Comic, 'cover' | 'slug' | 'title'> & { issuesCount: number }
