import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { assetKeys } from './assetKeys'
import { CollectibleComicFilterParams } from '@/models/asset/collectibleComicFilterParams'
import { fetchCollectibleComics } from '@/app/lib/api/asset/queries'

type Input = {
  enabled?: boolean
  params: CollectibleComicFilterParams
}

export const useFetchCollectibleComics = ({ enabled = true, params }: Input) => {
  const take = params.take || 20
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: assetKeys.getCollectibleComics(params),
    queryFn: ({ pageParam = 0 }) => fetchCollectibleComics({ ...params, skip: pageParam * take, take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= take) return allPages.length
    },
    staleTime: 1000 * 60 * 2, // stale for 2 hours
    enabled: enabled,
    throwOnError: onQueryError,
  })

  const { data } = infiniteQuery
  const flatData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  return { ...infiniteQuery, flatData }
}
