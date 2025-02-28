'use server'

import {
  TwitterIntentCampaignInterestParams,
  TwitterIntentComicMintedParams,
} from '@/models/twitter/twitterIntentComicMintedParams'
import { TWITTER_QUERY_KEYS } from '@/api/twitter/twitterKeys'
import { Nullable } from '@/models/common'
import { getTwitterIntentInviteUser } from '@/utils/helpers'
import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'

const { TWITTER, INTENT, COMIC_MINTED, EXPRESSED_INTEREST } = TWITTER_QUERY_KEYS

export const fetchTwitterIntentComicMinted = async (params: TwitterIntentComicMintedParams): Promise<string | null> => {
  const response = await fetchWrapper<string>({
    path: `${TWITTER}/${INTENT}/${COMIC_MINTED}`,
    params,
    isTextResponse: true,
  })
  return response.data
}

export const fetchTwitterIntentExpressedInterest = async (
  slug: string,
  params: TwitterIntentCampaignInterestParams
): Promise<string | null> => {
  const response = await fetchWrapper<string>({
    accessToken: await getAccessToken(),
    path: `${TWITTER}/${INTENT}/${EXPRESSED_INTEREST}/${slug}`,
    params,
    isTextResponse: true,
  })
  return response.data
}

export const fetchTwitterIntentInviteUser = async (
  username: string
): Promise<{ data: Nullable<string>; errorMessage?: string }> => {
  const twitterIntent = getTwitterIntentInviteUser(username)
  return { data: twitterIntent }
}
