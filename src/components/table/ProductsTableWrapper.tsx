'use client'

import { RawComic } from '@/models/comic/rawComic'
import { useDashboardStore } from '@/providers/TableStoreProvider'
import { DASHBOARD_TABS, ProductsTab, SORT_OPTIONS } from '@/constants/general'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import React, { useEffect, useState } from 'react'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { TableTabs } from './TableTabs'
import { TablePagination } from './TablePagination'
import { TableSort } from './TableSort'
import { useFetchRawComicIssues } from '@/api/comicIssue/queries/useFetchComicIssues'
import { ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { ComicIssuesTable } from './ComicIssuesTable'
import { ComicSortTag } from '@/models/comic/comicParams'
import { useFetchRawComics } from '@/api/comic/queries/useFetchComics'
import ComicSeriesTable from './ComicSeriesTable'

type Props = { initialData: RawComic[] }

export const ProductsTableWrapper: React.FC<Props> = ({ initialData }) => {
  const { setSortOptions, setCurrentPage } = useDashboardStore((state) => state)
  const [activeTab, setActiveTab] = useState<ProductsTab>(DASHBOARD_TABS.at(0)!)

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        My comics & art
      </Text>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <TableTabs
            activeTab={activeTab}
            tabs={DASHBOARD_TABS}
            onTabChange={(tab: ProductsTab) => {
              if (tab === ProductsTab.DigitalArt) {
                return
              }
              setSortOptions(tab === ProductsTab.Releases ? SORT_OPTIONS.COMIC_ISSUES : SORT_OPTIONS.COMICS)
              setCurrentPage(1)
              setActiveTab(tab)
            }}
          />
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
        {activeTab === ProductsTab.Releases ? (
          <ComicEpisodesTableWrapper />
        ) : (
          <ComicSeriesTableWrapper initialData={initialData} />
        )}
        <TablePagination />
      </div>
    </div>
  )
}

const ComicSeriesTableWrapper: React.FC<Props> = ({ initialData }) => {
  const { sortOrder, skip, sortTag, take } = useDashboardStore((state) => state)

  const { data: comics = [], refetch } = useFetchRawComics({
    initialData,
    params: { skip, take, sortOrder, sortTag: sortTag as ComicSortTag },
  })

  useEffect(() => {
    refetch()
  }, [skip, sortOrder, sortTag, take, refetch])

  return <ComicSeriesTable comics={comics} />
}

const ComicEpisodesTableWrapper: React.FC = () => {
  const { sortOrder, skip, sortTag, take } = useDashboardStore((state) => state)

  const { data: releases = [], refetch } = useFetchRawComicIssues({
    params: { skip, take, sortOrder, sortTag: sortTag as ComicIssueSortTag },
  })

  useEffect(() => {
    refetch()
  }, [skip, sortOrder, sortTag, take, refetch])

  return <ComicIssuesTable issues={releases} />
}
