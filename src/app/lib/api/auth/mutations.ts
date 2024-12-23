'use server'

import { ConnectWalletData } from '@/models/wallet/connectWallet'
import { fetchWrapper } from '../../fetchWrapper'
import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { getAccessToken } from '../../utils/auth'
import { baseApiUrl } from '@/constants/general'

const { AUTH, WALLET, CONNECT, DISCONNECT, REQUEST_PASSWORD, USER, REFRESH_TOKEN } = AUTH_QUERY_KEYS

export const connectUserWallet = async (data: ConnectWalletData): Promise<{ errorMessage?: string }> => {
  const accessToken = getAccessToken()
  const response = await fetchWrapper<void>({
    accessToken,
    path: `${AUTH}/${WALLET}/${CONNECT}`,
    method: 'PATCH',
    body: data,
  })
  return response
}

export const disconnectUserWallet = async (address: string): Promise<{ errorMessage?: string }> => {
  const accessToken = getAccessToken()
  return await fetchWrapper<void>({
    accessToken,
    path: `${AUTH}/${WALLET}/${DISCONNECT}/${address}`,
    method: 'PATCH',
  })
}

export const requestWalletPassword = async (address: string): Promise<string> => {
  const accessToken = getAccessToken()
  const response = await fetchWrapper<string>({
    accessToken,
    path: `${AUTH}/${WALLET}/${REQUEST_PASSWORD}/${address}`,
    method: 'PATCH',
    isTextResponse: true,
  })
  return response.data ?? ''
}

export const refreshTokenCall = async (refreshToken: string): Promise<string> => {
  const response = await fetch(`${baseApiUrl}/${AUTH}/${USER}/${REFRESH_TOKEN}/${refreshToken}`, {
    method: 'PATCH',
  })
  return await response.text()
}
