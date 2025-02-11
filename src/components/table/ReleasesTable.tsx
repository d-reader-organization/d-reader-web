'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import React, { useEffect } from 'react'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { useDashboardStore } from '@/providers/DashboardStoreProvider'
import { TableTabs } from './TableTabs'
import { TablePagination } from './TablePagination'
import { TableSort } from './TableSort'
import { useFetchRawComicIssues } from '@/api/comicIssue/queries/useFetchComicIssues'
import { ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { ReleasesTableComponent } from './ReleasesTableComponent'

type Props = { title: string }

export const ReleasesTable: React.FC<Props> = ({ title }) => {
  const { currentPage, sortOrder, skip, sortTag, take } = useDashboardStore((state) => state)

  const { data: releases = [], refetch } = useFetchRawComicIssues({
    params: { skip, take, sortOrder, sortTag: sortTag as ComicIssueSortTag },
  })
  const isTableEmpty = releases.length === 0

  useEffect(() => {
    console.log(`refetch releases`, { skip, take, sortOrder, sortTag })
    refetch()
  }, [skip, sortOrder, sortTag, take, currentPage, refetch])

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        {title}
      </Text>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <TableTabs />
          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              Icon={FilterIcon}
              iconOnly
              onClick={() => {
                console.log('Filter button clicked!')
              }}
            />
            <TableSort />
          </div>
        </div>

        <ReleasesTableComponent releases={releases} />
        {isTableEmpty ? (
          <Text as='p' styleVariant='secondary-heading' className='text-center text-white py-12'>
            You have no published products!
          </Text>
        ) : (
          <TablePagination />
        )}
      </div>
    </div>
  )
}
