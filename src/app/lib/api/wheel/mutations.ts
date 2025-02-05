'use server'

import { WheelReceipt } from '@/models/wheels'
import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'
import { SPIN_THE_WHEEL_KEYS } from '@/api/wheel/keys'

const { SPIN, WHEEL } = SPIN_THE_WHEEL_KEYS

export const spinWheel = async (id: number) => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<WheelReceipt>({
    accessToken,
    path: `${WHEEL}/${SPIN}/${id}`,
    method: 'PATCH',
  })

  return response
}
