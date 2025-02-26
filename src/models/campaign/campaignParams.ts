import { Pagination } from '../pagination'

export type ExpressInterestParams = {
  expressedAmount: number
  ref?: string | null
}

export type CampaignFilterParams = Pagination

export type ReferredCampaignParams = Pagination

export type CampaignReferralParams = Pagination
