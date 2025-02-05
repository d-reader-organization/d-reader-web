import { Nullable } from '@/models/common'
import { fetchWrapper } from '../../fetchWrapper'
import { Wheel } from '@/models/wheels'
import { SPIN_THE_WHEEL_KEYS } from '@/api/wheel/keys'

const { GET, WHEEL } = SPIN_THE_WHEEL_KEYS

export const getActiveWheel = async (): Promise<Nullable<Wheel>> => {
  const response = await fetchWrapper<Wheel>({
    path: `${WHEEL}/${GET}?isActive=true`,
    method: 'GET',
  })
  return response.data
}
