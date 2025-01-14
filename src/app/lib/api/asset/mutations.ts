'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'
import { ASSET_QUERY_KEYS } from './keys'

const { ASSET, REQUEST_AUTOGRAPH } = ASSET_QUERY_KEYS

export const requestAutograph = async (address: string): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()

  const response = await fetchWrapper<void>({
    accessToken,
    path: `${ASSET}/${REQUEST_AUTOGRAPH}/${address}`,
    method: 'POST',
  })
  return response
}
