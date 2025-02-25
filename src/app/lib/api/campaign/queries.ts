import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { INVEST_QUERY_KEYS } from './keys'
import { getAccessToken } from '../../utils/auth'
import { Campaign, CampaignActivity, CampaignActivityItem } from '@/models/campaign'
import { ReturnResponse } from '@/lib/types'
import { PaginatedResponse } from '@/models/pagination'
import { CampaignReferralParams, ReferredCampaignParams } from '@/models/campaign/campaignParams'
import { CAMPAIGNS, SuccessfulCampaign } from '@/constants/projects'

const { GET, CAMPAIGN, BACKERS, REFERRAL, REFERRED } = INVEST_QUERY_KEYS

export function fetchSuccessfulCampaign(slug: string): SuccessfulCampaign | undefined {
  const campaign = CAMPAIGNS.find((campaign) => campaign.slug === slug)

  return campaign
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

export const fetchCampaignBackers = async (id: string): Promise<ReturnResponse<CampaignActivity>> => {
  const { data, errorMessage } = await fetchWrapper<CampaignActivity>({
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
): Promise<ReturnResponse<Nullable<PaginatedResponse<CampaignActivityItem>>>> => {
  const { data, errorMessage } = await fetchWrapper<PaginatedResponse<CampaignActivityItem>>({
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
