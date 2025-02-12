import { SortOrder } from '@/enums/sort'
import { Pagination } from '@/models/pagination'

export enum CreatorFilterTag {
  Popular = 'popular',
}

export enum CreatorSortTag {
  Name = 'name',
  Followers = 'followers',
}

export type CreatorParams = Pagination & {
  search?: string
  genreSlugs?: string[]
  sortOrder?: SortOrder
  filterTag?: CreatorFilterTag
  sortTag?: CreatorSortTag
}
