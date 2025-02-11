'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import React, { useEffect } from 'react'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { RawComic } from '@/models/comic/rawComic'
import { ComicSortTag } from '@/models/comic/comicParams'
import { useFetchRawComics } from '@/api/comic/queries'
import { useDashboardStore } from '@/providers/DashboardStoreProvider'
import { TableTabs } from './TableTabs'
import { TablePagination } from './TablePagination'
import { TableSort } from './TableSort'
import SeriesTableComponent from './SeriesTableComponent'

type Props = { title: string; initialData: RawComic[] }

export const SeriesTable: React.FC<Props> = ({ title, initialData }) => {
  const { currentPage, sortOrder, skip, sortTag, take } = useDashboardStore((state) => state)

  const { data: comics = [], refetch } = useFetchRawComics({
    initialData,
    params: { skip, take, sortOrder, sortTag: sortTag as ComicSortTag },
  })
  const isTableEmpty = comics.length === 0

  useEffect(() => {
    console.log(`refetch series`, { skip, take, sortOrder, sortTag })
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

        <SeriesTableComponent comics={comics} />
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

export default SeriesTable
