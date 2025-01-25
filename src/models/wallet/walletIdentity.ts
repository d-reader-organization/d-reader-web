import { Wallet } from '.'
import { User } from '../user'

// TODO: remove support for SNS?
// TODO: update this model 👇
export interface WalletIdentity {
  id?: User['id']
  avatar?: User['avatar']
  name?: User['username']
  address: Wallet['address']
  sns?: string
}
