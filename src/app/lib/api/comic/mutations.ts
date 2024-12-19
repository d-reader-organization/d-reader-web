'use server'

import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { RateComic } from '@/models/comic/rateComic'
import { getAccessToken } from '../../utils/auth'

const { COMIC, FAVOURITISE, RATE } = COMIC_QUERY_KEYS

export const rateComic = async ({ slug, request }: { slug: string; request: RateComic }): Promise<void> => {
  const accessToken = getAccessToken()
  await fetchWrapper<void>({
    accessToken,
    path: `${COMIC}/${RATE}/${slug}`,
    body: request,
    method: 'PATCH',
    isTextResponse: true,
  })
}

export const favouritiseComic = async (slug: string): Promise<void> => {
  const accessToken = getAccessToken()
  await fetchWrapper<void>({
    accessToken,
    path: `${COMIC}/${FAVOURITISE}/${slug}`,
    method: 'PATCH',
    isTextResponse: true,
  })
}
