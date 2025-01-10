import { Pagination } from '@/models/pagination'

export type ListedItemsParams = Pagination & {
  isSold?: boolean
  collectionAddress: string
}
