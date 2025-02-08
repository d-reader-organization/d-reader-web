'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import React, { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ComicRarity } from '@/enums/comicRarity'
import { PLACEHOLDER_AVATAR, SORT_OPTIONS } from '@/constants/general'
import { formatDistanceToNow } from 'date-fns'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import Image from 'next/image'
import { useTablePagination } from '@/hooks/useTablePagination'
import { BasicCollectibleComic } from '@/models/asset'
import { PencilIcon } from '@/components/icons/theme/PencilIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { TrashIcon } from '@/components/icons/theme/TrashIcon'
import { useTableSort } from '@/hooks/useTableSort'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { useTableTabs } from '@/hooks/useTableTabs'

interface Comic {
  asset: BasicCollectibleComic
  requestedAt: string
  resolvedAt?: string
  user: {
    username: string
    displayName: string
    avatar: string
  }
}

const myProducts: Comic[] = [
  {
    asset: {
      address: '1',
      name: 'Into the Grasslands #1032',
      image:
        'https://d323dls9ny69nf.cloudfront.net/comics/the-farmer-1722522111521/issues/into-the-grasslands-1722879335442/cover-uncommon-1723141682738.jpg',
      comicTitle: 'The Farmer',
      comicIssueTitle: 'Into the Grasslands',
      episodeNumber: 1,
      isSigned: false,
      isUsed: false,
      rarity: ComicRarity.Legendary,
    },
    requestedAt: '2025-01-25T21:38:00Z',
    resolvedAt: undefined,
    user: {
      username: 'studionx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
  },
  {
    asset: {
      address: '2',
      name: 'Into the Grasslands #1033',
      image:
        'https://d323dls9ny69nf.cloudfront.net/comics/the-farmer-1722522111521/issues/into-the-grasslands-1722879335442/cover-uncommon-1723141682738.jpg',
      comicTitle: 'The Farmer',
      comicIssueTitle: 'Into the Grasslands',
      episodeNumber: 1,
      isSigned: true,
      isUsed: true,
      rarity: ComicRarity.Rare,
    },
    requestedAt: '2025-01-25T12:00:00Z',
    resolvedAt: undefined,
    user: {
      username: 'studionx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
  },
]

enum ProductsTab {
  Series = 'Series',
  Releases = 'Releases',
  DigitalArt = 'Digital Art',
}

type Props = { title: string }

export const ProductsTable: React.FC<Props> = ({ title }) => {
  const isTableEmpty = myProducts.length === 0
  const { TableTabs, tab } = useTableTabs([ProductsTab.Series, ProductsTab.Releases, ProductsTab.DigitalArt])
  const { TablePagination, skip, take } = useTablePagination({ totalItems: myProducts.length })
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
  const { TableSort, value: sortTag, order: sortOrder } = useTableSort(selectOptions)

  console.log('MY PRODUCTS: ', { sortTag, sortOrder, skip, take })

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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Traits</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myProducts.map(({ asset, requestedAt, user }) => (
              <TableRow key={asset.address}>
                <TableCell>
                  <div className='flex items-center gap-2 relative'>
                    <Image
                      src={asset.image}
                      alt=''
                      {...COMIC_ISSUE_COVER_SIZE}
                      className='rounded-sm h-auto w-10 aspect-comic-issue-cover'
                    />
                    <div className='flex flex-col w-full max-lg:max-w-[240px] pr-12'>
                      <TextWithOverflow as='span' styleVariant='body-small' className='text-grey-200'>
                        {asset.comicTitle}
                      </TextWithOverflow>
                      <TextWithOverflow as='span' styleVariant='body-small' fontWeight='medium'>
                        {asset.name}
                      </TextWithOverflow>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2 text-nowrap'>
                    <Avatar className='size-6'>
                      <AvatarImage src={user.avatar || PLACEHOLDER_AVATAR} />
                      <AvatarFallback>
                        {/** fallback to 'G' as guest */}
                        {user.displayName[0] || 'G'}
                      </AvatarFallback>
                    </Avatar>
                    {user.displayName}
                  </div>
                </TableCell>
                <TableCell>TODO</TableCell>
                <TableCell>
                  <span title={new Date(requestedAt).toLocaleString()} className='text-nowrap'>
                    {formatDistanceToNow(new Date(requestedAt), { addSuffix: true, includeSeconds: true })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex justify-end gap-2'>
                    <Button
                      iconClassName='m-auto'
                      variant='ghost'
                      Icon={PencilIcon}
                      onClick={() => {
                        console.log('Comic signed!')
                      }}
                    />
                    <Button
                      iconClassName='m-auto'
                      variant='ghost'
                      Icon={TrashIcon}
                      onClick={() => {
                        console.log('Comic rejected!')
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
