import { Asset } from '@/models/asset'
import { fetchWrapper } from '../../fetchWrapper'
import { AssetParams } from '@/models/asset/assetParams'
import { ASSET_QUERY_KEYS } from './keys'

const { ASSET, GET } = ASSET_QUERY_KEYS

export const fetchAssets = async (params: AssetParams): Promise<Asset[]> => {
  const response = await fetchWrapper<Asset[]>({
    path: `${ASSET}/${GET}`,
    params,
    revalidateCacheInSeconds: 5,
  })
  return response.data ?? []
}
