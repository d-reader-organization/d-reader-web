import { SortOrder } from '@/enums/sort'
import { Pagination } from '@/models/pagination'

export enum ComicIssueFilterTag {
  Free = 'free',
  Popular = 'popular',
}

export enum ComicIssueSortTag {
  Title = 'title',
  Latest = 'latest',
  Rating = 'rating',
  Likes = 'likes',
  Readers = 'readers',
  Viewers = 'viewers',
}

export type ComicIssueParams = Pagination & {
  creatorId?: string | number
  comicSlug?: string
  search?: string
  genreSlugs?: string[]
  sortOrder?: SortOrder
  filterTag?: ComicIssueFilterTag
  sortTag?: ComicIssueSortTag
}

export type RawComicIssueParams = Omit<ComicIssueParams, 'filterTag'>
