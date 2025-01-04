import { AssetParams } from '@/models/asset/assetParams'

export const ASSET_QUERY_KEYS = Object.freeze({
  ASSET: 'asset',
  GET: 'get',
})

export const assetKeys = Object.freeze({
  getAssets: (params: AssetParams) => [
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
