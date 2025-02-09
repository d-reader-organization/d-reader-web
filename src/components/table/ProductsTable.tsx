'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import React, { useEffect, useMemo, useState } from 'react'
import { SORT_OPTIONS } from '@/constants/general'
import { useTablePagination } from '@/hooks/useTablePagination'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { useTableSort } from '@/hooks/useTableSort'
import { useTableTabs } from '@/hooks/useTableTabs'
import ProductTableComponent from './ProductTableComponent'
import { RawComic } from '@/models/comic/rawComic'
import { fetchRawComics } from '@/app/lib/api/comic/queries'
import { ComicSortTag } from '@/models/comic/comicParams'

enum ProductsTab {
  Series = 'Series',
  Releases = 'Releases',
  DigitalArt = 'Digital Art',
}

type Props = { title: string }

export const ProductsTable: React.FC<Props> = ({ title }) => {
  const { TableTabs, tab } = useTableTabs([ProductsTab.Series, ProductsTab.Releases, ProductsTab.DigitalArt])
  const selectOptions = useMemo(() => {
    switch (tab) {
      case ProductsTab.Series:
        return SORT_OPTIONS.COMICS
      case ProductsTab.Releases:
        return SORT_OPTIONS.COMIC_ISSUES
      case ProductsTab.DigitalArt:
        return SORT_OPTIONS.DIGITAL_ARTWORK
    }
  }, [tab])
  const { TableSort, tag: sortTag, order: sortOrder } = useTableSort(selectOptions)
  const { TablePagination, skip, take } = useTablePagination({ totalItems: 84 })

  const [comics, setComics] = useState<RawComic[]>([])
  const isTableEmpty = comics.length === 0

  // TODO: there must be a better way to do this? it feels slow in localhost
  useEffect(() => {
    const fetchData = async () => {
      const fetchedComics = await fetchRawComics({ skip, take, sortOrder, sortTag: sortTag as ComicSortTag })
      setComics(fetchedComics)
    }
    fetchData()
  }, [skip, sortOrder, sortTag, take])

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

        <ProductTableComponent comics={comics} />
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

export default ProductsTable
