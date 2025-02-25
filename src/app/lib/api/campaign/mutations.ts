'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { INVEST_QUERY_KEYS } from './keys'
import { getAccessToken } from '../../utils/auth'
import { ExpressInterestParams } from '@/models/campaign/campaignParams'

const { CAMPAIGN, EXPRESS_INTEREST } = INVEST_QUERY_KEYS

export const expressInterest = async ({
  slug,
  request,
}: {
  slug: string
  request: ExpressInterestParams
}): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<void>({
    accessToken,
    path: `${CAMPAIGN}/${EXPRESS_INTEREST}/${slug}`,
    body: request,
    method: 'PATCH',
  })

  return { errorMessage: response.errorMessage }
}
