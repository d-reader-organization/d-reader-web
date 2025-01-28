import { fetchWrapper } from '../../fetchWrapper'
import { CollectibleComicFilterParams } from '@/models/asset/collectibleComicFilterParams'
import { ASSET_QUERY_KEYS } from './keys'
import { CollectibleComicRarityStats } from '@/models/asset/collectibleComicRarityStats'
import { CollectibleComic } from '@/models/asset'

const { ASSET, GET, COLLECTIBLE_COMIC, RARITY_STATS } = ASSET_QUERY_KEYS

export const fetchCollectibleComics = async (params: CollectibleComicFilterParams): Promise<CollectibleComic[]> => {
  const response = await fetchWrapper<CollectibleComic[]>({
    path: `${ASSET}/${GET}/${COLLECTIBLE_COMIC}`,
    params,
    revalidateCacheInSeconds: 5,
  })
  return response.data ?? []
}

export async function findCollectibleComicRarityStats(collectionAddress: string) {
  const response = await fetchWrapper<CollectibleComicRarityStats[]>({
    path: `${ASSET}/${GET}/${COLLECTIBLE_COMIC}/${RARITY_STATS}/${collectionAddress}`,
    revalidateCacheInSeconds: 60 * 15,
  })
  return response.data ?? []
}
