'use server'

import { Wallet, UpdateWalletData } from '@/models/wallet'
import { fetchWrapper } from '@/app/lib/fetchWrapper'
import { Nullable } from '@/models/common'
import { WALLET_QUERY_KEYS } from './keys'
import { getAccessToken } from '../../utils/auth'

const { WALLET, UPDATE } = WALLET_QUERY_KEYS

export const updateWallet = async (address: string, request: UpdateWalletData): Promise<Nullable<Wallet>> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<Wallet>({
    accessToken,
    path: `${WALLET}/${UPDATE}/${address}`,
    body: request,
    method: 'PATCH',
  })
  return response.data
}
