import { Asset } from '@/models/asset'
import { BasicUser } from '../user'

export interface CandyMachineReceipt {
  asset: Pick<Asset, 'address' | 'name'>
  buyer?: BasicUser
  buyerAddress: string
  candyMachineAddress: string
  price: number
  timestamp: string
  splTokenAddress: string
}
