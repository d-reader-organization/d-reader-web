'use server'

import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { RateComicIssue } from '@/models/comicIssue/rateComicIssue'
import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'

const { COMIC_ISSUE, FAVOURITISE, RATE } = COMIC_ISSUE_QUERY_KEYS

export const rateComicIssue = async ({
  id,
  request,
}: {
  id: string | number
  request: RateComicIssue
}): Promise<void> => {
  const accessToken = await getAccessToken()
  await fetchWrapper<void>({
    accessToken,
    path: `${COMIC_ISSUE}/${RATE}/${id}`,
    body: request,
    method: 'PATCH',
    isTextResponse: true,
  })
}

export const favouritiseComicIssue = async (id: string | number): Promise<void> => {
  const accessToken = await getAccessToken()
  await fetchWrapper<void>({
    accessToken,
    path: `${COMIC_ISSUE}/${FAVOURITISE}/${id}`,
    method: 'PATCH',
    isTextResponse: true,
  })
}
