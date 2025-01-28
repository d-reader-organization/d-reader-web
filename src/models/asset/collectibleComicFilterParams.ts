import { Pagination } from '@/models/pagination'

export type CollectibleComicFilterParams = Partial<Pagination> & {
  ownerAddress?: string
  comicSlug?: string
  userId?: string | number
  comicIssueId?: string | number
  collectionAddress?: string
}
