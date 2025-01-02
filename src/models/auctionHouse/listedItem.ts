import { WalletIdentity } from '@/models/wallet/walletIdentity'
import { CollectibleComic } from '../comic/collectibleComic'

export interface ListedItem {
  id: number
  collectibleComic: CollectibleComic
  seller: WalletIdentity
  splTokenAddress: string
  price: number
  createdAt: Date
}
