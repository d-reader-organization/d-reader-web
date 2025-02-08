import { ProductType } from '@/enums/productType'
import { TransactionSource } from '@/enums/transactionSource'
import { BasicUser } from '../user'
import { SortOrder } from '@/enums/sort'
import { Pagination } from '@/models/pagination'

export type TransactionHistoryItem = {
  id: string
  confirmedAt: string
  buyer?: BasicUser
  buyerAddress: string
  source: TransactionSource
  product: ProductType
  amount: string
}

export enum TransactionHistorySortTag {
  Date = 'date',
  Amount = 'amount',
}

export type TransactionHistoryParams = Pagination & {
  search?: string
  source?: TransactionSource[]
  product?: ProductType[]
  // filterTag?: TransactionHistoryFilterTag
  sortTag?: TransactionHistorySortTag
  sortOrder?: SortOrder
}
