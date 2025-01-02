import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { ListedItemsParams } from '@/models/auctionHouse/listedItemParams'
import { auctionHouseKeys } from './auctionHouseKeys'
import { findCollectibleComicListings } from '@/app/lib/api/auctionHouse/queries'

type Input = {
  enabled?: boolean
  params: ListedItemsParams
}

export const useFetchCollectibleComicListings = ({ enabled = true, params }: Input) => {
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: auctionHouseKeys.getCollectibleComicListings(params),
    queryFn: ({ pageParam = 0 }) => findCollectibleComicListings({ ...params, skip: pageParam * params.take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    // staleTime: 1000 * 60 * 30, // stale for 30 hour
    enabled: enabled && !!params.take,
    throwOnError: onQueryError,
  })

  const { data } = infiniteQuery
  const flatData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  return { ...infiniteQuery, flatData }
}
