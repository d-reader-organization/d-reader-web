'use server' // TODO figure out

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { User, UserConsent } from '@/models/user'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { getAccessToken } from '../../utils/auth'
import { Wallet } from '@/models/wallet'

const { USER, GET, ME, WALLETS, PRIVACY_CONSENT } = USER_QUERY_KEYS

export const fetchMe = async (): Promise<Nullable<User>> => {
  const accessToken = await getAccessToken()
  if (!accessToken) {
    return null
  }
  const response = await fetchWrapper<User>({ path: `${USER}/${GET}/${ME}`, accessToken })
  return response.data
}

export const fetchUserWallets = async (id: string | number): Promise<Wallet[]> => {
  const response = await fetchWrapper<Wallet[]>({ path: `${USER}/${GET}/${id}/${WALLETS}` })
  return response.data ?? []
}

export const fetchUserConsents = async (): Promise<UserConsent[]> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<UserConsent[]>({
    accessToken,
    path: `${USER}/${PRIVACY_CONSENT}`,
  })
  return response.data ?? []
}
