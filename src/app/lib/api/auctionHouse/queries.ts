import { ListedItem } from '@/models/auctionHouse/listedItem'
import { fetchWrapper } from '../../fetchWrapper'
import { ListedItemsParams } from '@/models/auctionHouse/listedItemParams'
import { AUCTION_HOUSE_QUERY_KEYS } from '@/api/auctionHouse/auctionHouseKeys'

const { GET, LISTINGS, COLLECTIBLE_COMICS, AUCTION_HOUSE } = AUCTION_HOUSE_QUERY_KEYS

export async function findCollectibleComicListings(params: ListedItemsParams) {
  const response = await fetchWrapper<ListedItem[]>({
    path: `${AUCTION_HOUSE}/${GET}/${LISTINGS}/${COLLECTIBLE_COMICS}`,
    params,
    revalidateCacheInSeconds: 5,
  })
  return response.data ?? []
}
