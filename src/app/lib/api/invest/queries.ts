'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { INVEST_QUERY_KEYS } from '@/api/invest'
import {
  isSuccessfulProject,
  Project,
  ProjectExpressedInterest,
  SuccessfulProject,
  UserProjectInterest,
} from '@/models/project'
import { PROJECTS } from '@/constants/projects'

const { GET, INVEST } = INVEST_QUERY_KEYS

export const fetchSuccessfulProjects = async (): Promise<{
  data: Nullable<SuccessfulProject[]>
  errorMessage?: string
}> => {
  const { data: investorInterests, errorMessage } = await fetchWrapper<ProjectExpressedInterest[]>({
    path: `${INVEST}/${GET}`,
  })

  if (errorMessage) {
    return { data: null, errorMessage }
  }

  const successfulProjects = PROJECTS.filter(isSuccessfulProject)
  const projects = successfulProjects.map((project) => ({
    ...project,
    funding: {
      ...project.funding,
      numberOfInterestedInvestors: investorInterests?.find((interest) => interest.id === project.id)?.count ?? 0,
    },
  }))

  return { data: projects }
}

export const fetchProject = async (slug: string): Promise<{ data: Nullable<Project>; errorMessage?: string }> => {
  const project = PROJECTS.find((project) => project.slug === slug)
  if (!project) {
    return { data: null, errorMessage: "Project with slug doesn't exists" }
  }

  const { data } = await fetchWrapper<UserProjectInterest>({
    path: `${INVEST}/${GET}/${project?.id}`,
  })

  if (!data) {
    return { data: null, errorMessage: "Project with slug doesn't exists" }
  }

  return {
    data: {
      ...project,
      funding: {
        ...project.funding,
        numberOfInterestedInvestors: data.countOfUserExpressedInterest,
        isUserInterested: data.isInterested,
      },
    },
  }
}
