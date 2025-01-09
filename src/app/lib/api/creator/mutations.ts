'use server'

import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'

const { CREATOR, FOLLOW } = CREATOR_QUERY_KEYS

export const followCreator = async (slug: string): Promise<void> => {
  const accessToken = await getAccessToken()
  await fetchWrapper<void>({ accessToken, path: `${CREATOR}/${FOLLOW}/${slug}`, method: 'PATCH', isTextResponse: true })
}
