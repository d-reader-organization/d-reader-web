import { ListedItemsParams } from '@/models/auctionHouse/listedItemParams'

export const AUCTION_HOUSE_QUERY_KEYS = Object.freeze({
  AUCTION_HOUSE: 'auction-house',
  LISTINGS: 'listings',
  COLLECTIBLE_COMICS: 'collectible-comics',
  GET: 'get',
})

export const auctionHouseKeys = Object.freeze({
  getCollectibleComicListings: (params: ListedItemsParams) => [
    AUCTION_HOUSE_QUERY_KEYS.AUCTION_HOUSE,
    AUCTION_HOUSE_QUERY_KEYS.GET,
    AUCTION_HOUSE_QUERY_KEYS.COLLECTIBLE_COMICS,
    AUCTION_HOUSE_QUERY_KEYS.LISTINGS,
    params.collectionAddress,
    params.isSold,
    params.skip,
    params.take,
  ],
})
