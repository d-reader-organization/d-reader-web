import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import {
  isSuccessfulProject,
  Project,
  ReferralCampaign,
  SuccessfulProject,
  UserInterestedReceipt,
  UserProjectInterest,
} from '@/models/project'
import { PROJECTS } from '@/constants/projects'
import { findProjectBySlug } from '@/utils/helpers'
import { highInterestProjects, InterestProject } from '../../data/invest/projectsData'
import { INVEST_QUERY_KEYS } from './keys'
import { getAccessToken } from '../../utils/auth'

const { GET, INVEST, INTEREST_RECEIPTS, REFERRAL_CAMPAIGN, RECEIPT } = INVEST_QUERY_KEYS

export const fetchSuccessfulProjects = async (): Promise<{
  data: SuccessfulProject[]
  errorMessage?: string
}> => {
  const successfulProjects = PROJECTS.filter(isSuccessfulProject)
  return { data: successfulProjects }
}

export const fetchHighInterestProjects = async (): Promise<{
  data: InterestProject[]
  errorMessage?: string
}> => {
  const { data: userProjectInterest, errorMessage } = await fetchWrapper<UserProjectInterest[]>({
    path: `${INVEST}/${GET}`,
  })

  if (errorMessage) {
    return { data: [], errorMessage }
  }

  const projects = highInterestProjects.map((project) => ({
    ...project,
    stats: {
      ...project.stats,
      likes: userProjectInterest?.find((interest) => interest.slug === project.slug)?.countOfUserExpressedInterest ?? 0,
    },
  }))

  return { data: projects }
}

export const fetchProject = async (slug: string): Promise<{ data: Nullable<Project>; errorMessage?: string }> => {
  const project = findProjectBySlug(slug)
  if (!project) {
    return { data: null, errorMessage: `Project with slug ${slug} not found` }
  }

  const { data } = await fetchWrapper<UserProjectInterest>({
    accessToken: await getAccessToken(),
    path: `${INVEST}/${GET}/${slug}`,
  })

  if (!data) {
    return { data: null, errorMessage: `Project with slug ${slug} not found` }
  }

  return {
    data: {
      ...project,
      funding: {
        ...project.funding,
        numberOfInterestedInvestors: data.countOfUserExpressedInterest,
        expressedAmount: data.expressedAmount,
        pledgedAmount: data.expectedPledgedAmount || 0,
      },
    },
  }
}

export const fetchUserInterestedReceipts = async (slug: string): Promise<UserInterestedReceipt[]> => {
  const { data } = await fetchWrapper<UserInterestedReceipt[]>({
    path: `${INVEST}/${GET}/${slug}/${INTEREST_RECEIPTS}`,
  })
  return data || []
}

export const fetchAllReferralCampaignReceipts = async (): Promise<ReferralCampaign[]> => {
  const { data } = await fetchWrapper<ReferralCampaign[]>({
    accessToken: await getAccessToken(),
    path: `${INVEST}/${REFERRAL_CAMPAIGN}/${RECEIPT}/${GET}`,
    params: { skip: 0, take: 5 },
  })

  console.log(data)
  return data || []
}
