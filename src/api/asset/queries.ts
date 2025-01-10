import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { assetKeys } from './assetKeys'
import { AssetParams } from '@/models/asset/assetParams'
import { fetchAssets } from '@/app/lib/api/asset/queries'

type Input = {
  enabled?: boolean
  params: AssetParams
}

export const useFetchAssets = ({ enabled = true, params }: Input) => {
  const take = params.take || 20
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: assetKeys.getAssets(params),
    queryFn: ({ pageParam = 0 }) => fetchAssets({ ...params, skip: pageParam * take, take }),
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
