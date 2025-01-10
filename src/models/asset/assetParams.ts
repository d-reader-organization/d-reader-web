import { Pagination } from '@/models/pagination'

export type AssetParams = Partial<Pagination> & {
  ownerAddress?: string
  comicSlug?: string
  userId?: string | number
  comicIssueId?: string | number
  collectionAddress?: string
}
