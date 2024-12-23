import { fetchWrapper } from '../../fetchWrapper'
import { CandyMachine, LaunchpadModel } from '@/models/candyMachine'
import { CandyMachineParams } from '@/models/candyMachine/candyMachineParams'
import { Nullable } from '@/models/common'
import { Pagination } from '@/models/pagination'

const CANDY_MACHINE_QUERY_KEYS = Object.freeze({
  CANDY_MACHINE: 'candy-machine',
  GET: 'get',
  ELIGIBLE_GROUPS: 'eligible-groups',
  GROUPS: 'groups',
  LAUNCHPADS: 'launchpads',
})

const { CANDY_MACHINE, GET, LAUNCHPADS } = CANDY_MACHINE_QUERY_KEYS

export const fetchCandyMachine = async ({
  params,
  accessToken,
}: {
  params: CandyMachineParams
  accessToken?: string
}): Promise<Nullable<CandyMachine>> => {
  const response = await fetchWrapper<CandyMachine>({
    accessToken,
    path: `${CANDY_MACHINE}/${GET}`,
    params,
    revalidateCacheInSeconds: 2,
  })
  return response.data
}

export const fetchLaunchpads = async (params: Pagination): Promise<LaunchpadModel[]> => {
  const response = await fetchWrapper<LaunchpadModel[]>({
    path: `${CANDY_MACHINE}/${GET}/${LAUNCHPADS}`,
    params,
    revalidateCacheInSeconds: 60,
  })
  return response.data ?? []
}
