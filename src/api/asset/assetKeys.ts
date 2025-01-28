import { CollectibleComicFilterParams } from '@/models/asset/collectibleComicFilterParams'

export const ASSET_QUERY_KEYS = Object.freeze({
  ASSET: 'asset',
  GET: 'get',
  COLLECTIBLE_COMIC: 'collectible-comic'
})

export const assetKeys = Object.freeze({
  getCollectibleComics: (params: CollectibleComicFilterParams) => [
    ASSET_QUERY_KEYS.ASSET,
    ASSET_QUERY_KEYS.GET,
    params.collectionAddress,
    params.ownerAddress,
    params.comicSlug,
    params.comicIssueId,
    params.ownerAddress,
    params.skip,
    params.take,
  ],
})
