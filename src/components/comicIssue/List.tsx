'use client'

import { useFetchComicIssues } from '@/api/comicIssue/queries/useFetchComicIssues'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import useOnScreen from '@/hooks/useOnScreen'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import React, { useEffect, useMemo } from 'react'
import { Text } from '../ui/Text'
import clsx from 'clsx'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { DefaultComicIssueCard } from './cards/DefaultCard'

type Props = {
  enabled: boolean
  issuesCount?: number
  hideItemsCount?: boolean
  narrow?: boolean
  params: Partial<ComicIssueParams>
}

export const ComicIssueList: React.FC<Props> = ({
  enabled,
  issuesCount,
  hideItemsCount = false,
  narrow = false,
  params,
}) => {
  const [, showMore, showMoreRef] = useOnScreen()
  const { xs, sm, md, lg, xl } = useBreakpoints()

  const take = useMemo(() => {
    if (xl) return narrow ? 12 : 18
    else if (lg) return narrow ? 12 : 18
    else if (md) return narrow ? 9 : 12
    else if (sm) return 9
    else if (xs) return 6
    else return 0
  }, [xl, narrow, lg, md, sm, xs])

  const {
    flatData: comicIssues,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useFetchComicIssues({
    params: { skip: 0, take, ...params },
    enabled,
  })

  useEffect(() => {
    if (showMore && hasNextPage && !isFetching) fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching, showMore])

  if (take === 0) {
    return null
  }
  return (
    <>
      {issuesCount ? (
        <Text className='border-b border-grey-100 py-6 my-6' as='h4' styleVariant='primary-heading' fontWeight='normal'>
          Issues ( {`${issuesCount}`} )
        </Text>
      ) : null}
      <div className='flex flex-wrap gap-4'>
        {comicIssues.map((issue) => (
          <DefaultComicIssueCard
            key={`${issue.id}-${issue.slug}`}
            className={clsx(
              `basis-[45%] sm:basis-[30%] md:basis-[22%] lg:basis-[15%]`,
              narrow && 'md:basis-[30%] lg:basis-[22%]'
            )}
            comicIssue={issue}
          />
        ))}
      </div>
      <div className='flex justify-center py-12' ref={showMoreRef}>
        {isFetching && <LoaderIcon className='size-4.5' />}
        {!hasNextPage &&
          !isFetching &&
          !hideItemsCount &&
          `${comicIssues.length} ${comicIssues.length === 1 ? 'item' : 'items'} found`}
      </div>
    </>
  )
}
