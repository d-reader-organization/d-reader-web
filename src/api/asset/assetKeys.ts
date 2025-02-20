import { SignatureRequestParams } from '@/models/asset'
import { CollectibleComicFilterParams } from '@/models/asset/collectibleComicFilterParams'

export const ASSET_QUERY_KEYS = Object.freeze({
  ASSET: 'asset',
  GET: 'get',
  COLLECTIBLE_COMIC: 'collectible-comic',
  AUTOGRAPH: 'autograph',
  REQUEST: 'request',
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
  getAutographRequests: (params: SignatureRequestParams) => [
    ASSET_QUERY_KEYS.ASSET,
    ASSET_QUERY_KEYS.AUTOGRAPH,
    ASSET_QUERY_KEYS.REQUEST,
    ASSET_QUERY_KEYS.GET,
    params.skip,
    params.take,
  ],
})
