'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'
import { ASSET_QUERY_KEYS } from './keys'

const { ASSET, AUTOGRAPH, REQUEST } = ASSET_QUERY_KEYS

export const requestAutograph = async (address: string): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()

  const response = await fetchWrapper<void>({
    accessToken,
    path: `${ASSET}/${AUTOGRAPH}/${REQUEST}/${address}`,
    method: 'POST',
  })
  return response
}
