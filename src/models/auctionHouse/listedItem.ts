import { CollectibleComic } from '../asset'
import { BasicUser } from '../user'

export interface ListedItem {
  id: number
  collectibleComic: CollectibleComic
  seller?: BasicUser
  sellerAddress: string
  splTokenAddress: string
  price: number
  createdAt: Date
}
