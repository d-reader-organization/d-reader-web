'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { ExpressInterest } from '@/models/project'
import { INVEST_QUERY_KEYS } from './keys'
import { getAccessToken } from '../../utils/auth'

const { INVEST, EXPRESS_INTEREST } = INVEST_QUERY_KEYS

export const expressInterest = async ({
  slug,
  request,
}: {
  slug: string
  request: ExpressInterest
}): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<void>({
    accessToken,
    path: `${INVEST}/${EXPRESS_INTEREST}/${slug}`,
    body: request,
    method: 'PATCH',
  })

  return { errorMessage: response.errorMessage }
}
