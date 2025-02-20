import { TwitterIntentComicMintedParams } from '@/models/twitter/twitterIntentComicMintedParams'
import { TWITTER_QUERY_KEYS } from '@/api/twitter/twitterKeys'
import { PROJECTS } from '@/constants/projects'
import { Nullable } from '@/models/common'
import { getTwitterIntentExpressedInterest, getTwitterIntentInviteUser } from '@/utils/helpers'
import { fetchWrapper } from '../../fetchWrapper'

const { TWITTER, INTENT, COMIC_MINTED } = TWITTER_QUERY_KEYS

export const fetchTwitterIntentComicMinted = async (params: TwitterIntentComicMintedParams): Promise<string | null> => {
  const response = await fetchWrapper<string>({
    path: `${TWITTER}/${INTENT}/${COMIC_MINTED}`,
    params,
    isTextResponse: true,
  })
  return response.data
}

export const fetchTwitterIntentExpressedInterest = ({
  slug,
  username,
}: {
  slug: string
  username: string
}): { data: Nullable<string>; errorMessage?: string } => {
  const project = PROJECTS.find((project) => project.slug === slug)
  if (!project) {
    return { data: null, errorMessage: `Project with slug ${slug} not found` }
  }

  const twitterIntent = getTwitterIntentExpressedInterest({ project, username })
  return { data: twitterIntent }
}

export const fetchTwitterIntentInviteUser = (username: string): { data: Nullable<string>; errorMessage?: string } => {
  const twitterIntent = getTwitterIntentInviteUser(username)
  return { data: twitterIntent }
}
