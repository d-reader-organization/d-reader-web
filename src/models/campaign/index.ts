import { BasicCreator } from '../creator'
import { BasicUser } from '../user'

export type BasicCampaign = {
  id: number
  title: string
  slug: string
  description: string
  subtitle: string
  banner: string
  cover: string
  info: string
  video: string
  raiseGoal: number
  startDate?: Date
  endDate?: Date
}

export interface Campaign extends BasicCampaign {
  stats?: CampaignStats
  creator?: BasicCreator
  rewards?: CampaignReward[]
}

export type CampaignStats = {
  tentativeBackers: number
  tentativeAmountPledged: number
  myTentativeAmount?: number
}

export type CampaignReward = {
  id: number
  name: string
  description: string
  image: string
  price: number
}

export type CampaignActivityItem = {
  timestamp: Date
  user: BasicUser
  amount: number
}

export type CampaignActivity = CampaignActivityItem[]
