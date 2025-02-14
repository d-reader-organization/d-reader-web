'use server' // TODO: figure out

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { User, UserConsent } from '@/models/user'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { getAccessToken } from '../../utils/auth'
import { Wallet } from '@/models/wallet'
import { Referral } from '@/models/project'

const { USER, GET, ME, WALLETS, PRIVACY_CONSENT, REFERRALS } = USER_QUERY_KEYS

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

export const fetchUserReferrals = async (): Promise<Referral[]> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<Referral[]>({
    accessToken,
    path: `${USER}/${REFERRALS}/${GET}`,
    params: { skip: 0, take: 5 },
  })

  return response.data ?? []
}
