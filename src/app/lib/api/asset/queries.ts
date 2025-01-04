import { Asset } from '@/models/asset'
import { fetchWrapper } from '../../fetchWrapper'
import { AssetParams } from '@/models/asset/assetParams'
import { ASSET_QUERY_KEYS } from './keys'
import { CollectibleComicRarityStats } from '@/models/asset/collectibleComicRarityStats'

const { ASSET, GET, COLLECTIBLE_COMIC, RARITY_STATS } = ASSET_QUERY_KEYS

export const fetchAssets = async (params: AssetParams): Promise<Asset[]> => {
  const response = await fetchWrapper<Asset[]>({
    path: `${ASSET}/${GET}`,
    params,
    revalidateCacheInSeconds: 5,
  })
  return response.data ?? []
}

export async function findCollectibleComicRarityStats(collectionAddress: string) {
  const response = await fetchWrapper<CollectibleComicRarityStats[]>({
    path: `${ASSET}/${GET}/${COLLECTIBLE_COMIC}/${RARITY_STATS}/${collectionAddress}`,
    revalidateCacheInSeconds: 60 * 30,
  })
  return response.data ?? []
}
