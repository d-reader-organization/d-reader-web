import { SETTINGS_QUERY_KEYS } from '@/api/settings/settingsKeys'
import { SplToken } from '@/models/settings/splToken'
import { fetchWrapper } from '@/app/lib/fetchWrapper'

const { SETTINGS, SPL_TOKEN, GET } = SETTINGS_QUERY_KEYS

export const fetchSupportedTokens = async (): Promise<SplToken[]> => {
  const response = await fetchWrapper<SplToken[]>({
    path: `${SETTINGS}/${SPL_TOKEN}/${GET}`,
    revalidateCacheInSeconds: 60 * 60,
  })
  return response.data ?? []
}
