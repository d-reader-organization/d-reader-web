import { ComicRarity } from '@/enums/comicRarity'
import { BasicUser } from '../user'

export interface AssetEventData {
  name: string
  address: string
  isUsed: boolean
  isSigned: boolean
  rarity: ComicRarity
  image: string
}

export interface AssetMintEvent {
  assets: AssetEventData[]
  buyer?: BasicUser
  buyerAddress: string
  candyMachineAddress: string
  price: number
  timestamp: string
  splTokenAddress: string
}
