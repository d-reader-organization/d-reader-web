import { fetchWrapper } from '../../fetchWrapper'
import { CollectibleComicFilterParams } from '@/models/asset/collectibleComicFilterParams'
import { ASSET_QUERY_KEYS } from './keys'
import { CollectibleComicRarityStats } from '@/models/asset/collectibleComicRarityStats'
import { CollectibleComic, SignatureRequestParams } from '@/models/asset'
import { PaginatedResponse } from '@/models/pagination'
import { Nullable } from '@/models/common'
import { SignatureRequest } from '@/models/asset/signatureRequest'

const { ASSET, GET, COLLECTIBLE_COMIC, RARITY_STATS, AUTOGRAPH, REQUEST } = ASSET_QUERY_KEYS

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

export const fetchSignatureRequests = async ({
  accessToken,
  params,
}: {
  accessToken: string
  params: SignatureRequestParams
}): Promise<Nullable<PaginatedResponse<SignatureRequest>>> => {
  const { data } = await fetchWrapper<PaginatedResponse<SignatureRequest>>({
    accessToken,
    params,
    path: `${ASSET}/${AUTOGRAPH}/${GET}/${REQUEST}`,
  })

  console.log(data)

  return data
}
