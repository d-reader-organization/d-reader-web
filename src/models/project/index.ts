import { BasicUser } from '../user'

export type ProjectCreator = {
  handle: string
  avatar: string
  displayName: string
  twitterHandle?: string
}

export type ProjectInfo = {
  section: string
  text: string
  image?: string
}[]

export type ProjectFunding = {
  pledgedAmount: number
  numberOfBackers: number
}

export type ProjectPayout = {
  roiPercent: number
  daysForRoi: number
  summary: string
  revenue: number
  numberOfBuyers: number
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  banner: string
  cover: string
  logo: string
  tags: string[]
  creator: ProjectCreator
  info: ProjectInfo
  funding: ProjectFunding
  payout?: ProjectPayout
  videoUrl?: string
}

export type SuccessfulProject = Project & { payout: ProjectPayout }

export function isSuccessfulProject(project: Project | undefined): project is SuccessfulProject {
  return project !== undefined && 'payout' in project
}

export type UserProjectInterest = {
  slug: string
  countOfUserExpressedInterest: number
  expressedAmount?: number
  expectedPledgedAmount?: number
}

export type ExpressInterest = {
  expressedAmount: number
  ref?: string | null
}

export type UserInterestedReceipt = {
  id: number
  projectSlug: string
  walletAddress: string
  transactionSignature: string
  timestamp: Date
  user: BasicUser
  expressedAmount: number
}

export type Referral = BasicUser & {
  referredAt: Date
}

export type ReferralCampaign = {
  title: string
  slug: string
  totalReferred: number
  receipts: UserInterestedReceipt[]
}

export type Reward = {
  id: number
  description: string
  image: string
  price: number
  title: string
}
