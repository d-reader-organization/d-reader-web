import { Creator, SearchResultCreator } from '@/models/creator'
import { CreatorParams } from '@/models/creator/creatorParams'
import { fetchWrapper } from '../../fetchWrapper'
import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { Nullable } from '@/models/common'

const { CREATOR, GET, SEARCH, ME } = CREATOR_QUERY_KEYS

export const fetchCreator = async ({
  slug,
  accessToken,
}: {
  slug: string
  accessToken?: string
}): Promise<Nullable<Creator>> => {
  const response = await fetchWrapper<Creator>({
    accessToken,
    path: `${CREATOR}/${GET}/${slug}`,
  })
  return response.data
}

export const fetchCreators = async ({
  params,
  accessToken,
}: {
  params: CreatorParams
  accessToken?: string
}): Promise<Creator[]> => {
  const { data } = await fetchWrapper<Creator[]>({
    accessToken,
    params,
    path: `${CREATOR}/${GET}`,
  })
  return data ?? []
}

export const searchCreators = async (params: CreatorParams): Promise<SearchResultCreator[]> => {
  const { data } = await fetchWrapper<SearchResultCreator[]>({
    params,
    path: `${CREATOR}/${SEARCH}`,
  })
  return data ?? []
}

export const fetchMe = async ({ accessToken }: { accessToken: string }): Promise<Nullable<Creator>> => {
  const response = await fetchWrapper<Creator>({ path: `${CREATOR}/${GET}/${ME}`, accessToken })
  return response.data
}
