import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { isSuccessfulProject, SuccessfulProject } from '@/models/project'
import { PROJECTS } from '@/constants/projects'
import { INVEST_QUERY_KEYS } from './keys'
import { getAccessToken } from '../../utils/auth'
import { Campaign, UserCampaignInterest } from '@/models/campaign'
import { ReturnResponse } from '@/lib/types'
import { PaginatedResponse } from '@/models/pagination'
import { CampaignReferralParams, ReferredCampaignParams } from '@/models/campaign/campaignParams'

const { GET, CAMPAIGN, BACKERS, REFERRAL, REFERRED } = INVEST_QUERY_KEYS

export const fetchSuccessfulProjects = async (): Promise<{
  data: SuccessfulProject[]
  errorMessage?: string
}> => {
  const successfulProjects = PROJECTS.filter(isSuccessfulProject)
  return { data: successfulProjects }
}

export const fetchCampaigns = async (): Promise<ReturnResponse<Campaign[]>> => {
  const { data: campaigns, errorMessage } = await fetchWrapper<Campaign[]>({
    path: `${CAMPAIGN}/${GET}`,
  })

  if (errorMessage) {
    return { data: [], errorMessage }
  }

  return { data: campaigns || [] }
}

export const fetchCampaign = async (slug: string): Promise<ReturnResponse<Nullable<Campaign>>> => {
  const { data, errorMessage } = await fetchWrapper<Campaign>({
    accessToken: await getAccessToken(),
    path: `${CAMPAIGN}/${GET}/${slug}`,
  })

  if (!data) {
    return { data: null, errorMessage }
  }

  return { data }
}

export const fetchCampaignBackers = async (id: string): Promise<ReturnResponse<UserCampaignInterest[]>> => {
  const { data, errorMessage } = await fetchWrapper<UserCampaignInterest[]>({
    path: `${CAMPAIGN}/${GET}/${id}/${BACKERS}`,
  })

  if (!data) {
    return { data: [], errorMessage }
  }

  return { data }
}

export const fetchCampaignReferrals = async (
  id: string | number,
  params: CampaignReferralParams
): Promise<ReturnResponse<Nullable<PaginatedResponse<UserCampaignInterest>>>> => {
  const { data, errorMessage } = await fetchWrapper<PaginatedResponse<UserCampaignInterest>>({
    accessToken: await getAccessToken(),
    path: `${CAMPAIGN}/${GET}/${id}/${REFERRAL}`,
    params,
  })

  if (!data) {
    return { data: null, errorMessage }
  }

  return { data }
}

export const fetchReferredCampaigns = async (params: ReferredCampaignParams): Promise<ReturnResponse<Campaign[]>> => {
  const { data, errorMessage } = await fetchWrapper<Campaign[]>({
    accessToken: await getAccessToken(),
    path: `${CAMPAIGN}/${REFERRED}/${GET}`,
    params,
  })

  if (!data) {
    return { data: [], errorMessage }
  }

  return { data }
}
