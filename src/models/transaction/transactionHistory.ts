import { ProductType } from '@/enums/productType'
import { TransactionSource } from '@/enums/transactionSource'
import { BasicUser } from '../user'

export type TransactionHistoryItem = {
  id: string
  confirmedAt: string
  buyer?: BasicUser
  buyerAddress: string
  source: TransactionSource
  product: ProductType
  amount: string
}
