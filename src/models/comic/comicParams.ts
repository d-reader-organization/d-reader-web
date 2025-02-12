import { SortOrder } from '@/enums/sort'
import { Pagination } from '@/models/pagination'

export enum ComicFilterTag {
  Popular = 'popular',
}

export enum ComicSortTag {
  Title = 'title',
  Rating = 'rating',
  Likes = 'likes',
  Readers = 'readers',
  Viewers = 'viewers',
  Published = 'published',
}

export type ComicParams = Pagination & {
  creatorId?: string | number
  search?: string
  genreSlugs?: string[]
  filterTag?: ComicFilterTag
  sortTag?: ComicSortTag
  sortOrder?: SortOrder
}

export type RawComicParams = Omit<ComicParams, 'filterTag'>
