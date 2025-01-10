import { useMemo } from 'react'
import { creatorKeys } from '@/api/creator/creatorKeys'
import { CreatorParams } from '@/models/creator/creatorParams'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchCreators } from '@/app/lib/api/creator/queries'
import { onQueryError } from '@/components/ui'

export const useFetchCreators = ({
  params,
  accessToken,
  enabled = true,
}: {
  params: CreatorParams
  accessToken: string
  enabled?: boolean
}) => {
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: creatorKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) =>
      fetchCreators({ params: { ...params, skip: pageParam * params.take }, accessToken }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    //staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: enabled && !!params.take,
    throwOnError: onQueryError,
    refetchOnMount:true,
    refetchOnWindowFocus:true
  })

  const { data } = infiniteQuery
  const flatData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  return { ...infiniteQuery, flatData }
}
