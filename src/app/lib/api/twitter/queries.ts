import {
  TwitterIntentCampaignInterestParams,
  TwitterIntentComicMintedParams,
} from '@/models/twitter/twitterIntentComicMintedParams'
import { TWITTER_QUERY_KEYS } from '@/api/twitter/twitterKeys'
import { Nullable } from '@/models/common'
import { getTwitterIntentExpressedInterest, getTwitterIntentInviteUser } from '@/utils/helpers'
import { fetchWrapper } from '../../fetchWrapper'

const { TWITTER, INTENT, COMIC_MINTED, CAMPAIGN } = TWITTER_QUERY_KEYS

export const fetchTwitterIntentComicMinted = async (params: TwitterIntentComicMintedParams): Promise<string | null> => {
  const response = await fetchWrapper<string>({
    path: `${TWITTER}/${INTENT}/${COMIC_MINTED}`,
    params,
    isTextResponse: true,
  })
  return response.data
}

export const fetchTwitterIntentExpressedInterest = async (
  params: TwitterIntentCampaignInterestParams
): Promise<string | null> => {
  const response = await fetchWrapper<string>({
    path: `${TWITTER}/${INTENT}/${COMIC_MINTED}`,
    params,
    isTextResponse: true,
  })
  return response.data
}

export const fetchTwitterIntentInviteUser = (username: string): { data: Nullable<string>; errorMessage?: string } => {
  const twitterIntent = getTwitterIntentInviteUser(username)
  return { data: twitterIntent }
}
