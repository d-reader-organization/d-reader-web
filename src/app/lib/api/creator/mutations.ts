'use server'

import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'

const { CREATOR, FOLLOW } = CREATOR_QUERY_KEYS

export const followCreator = async (id: number): Promise<void> => {
  const accessToken = await getAccessToken()
  await fetchWrapper<void>({ accessToken, path: `${CREATOR}/${FOLLOW}/${id}`, method: 'PATCH', isTextResponse: true })
}
