'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ComicRarity } from '@/enums/comicRarity'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'
import Image from 'next/image'
import { usePaginationControls } from '@/hooks/usePaginationControls'
import { BasicCollectibleComic } from '@/models/asset'
import { PencilIcon } from '@/components/icons/theme/PencilIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { SortOrder } from '@/enums/sortOrder'
import { useSortTagSelect } from '@/hooks/useSortTagSelect'

interface SignatureRequest {
  asset: BasicCollectibleComic
  requestedAt: string
  resolvedAt?: string
  user: {
    username: string
    displayName: string
    avatar: string
  }
}

const myProducts: SignatureRequest[] = [
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
  const [tab, setTab] = useState<ProductsTab>(ProductsTab.Series)
  const isTableEmpty = myProducts.length === 0
  const { PaginationControls, skip, take } = usePaginationControls({ totalItems: myProducts.length })
  const { SortSelect } = useSortTagSelect([
    { tag: 'Newest', order: SortOrder.ASC, value: '1', label: 'Newest' },
    { tag: 'Oldest', order: SortOrder.DESC, value: '2', label: 'Oldest' },
  ])

  console.log('MY PRODUCTS: ', { skip, take, tab })

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        {title}
      </Text>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === ProductsTab.Series ? 'secondary' : 'ghost'}
              onClick={() => setTab(ProductsTab.Series)}
              className='h-8 font-bold w-[110px]'
            >
              {ProductsTab.Series}
            </Button>
            <Button
              variant={tab === ProductsTab.Releases ? 'secondary' : 'ghost'}
              onClick={() => setTab(ProductsTab.Releases)}
              className='h-8 font-bold w-[110px]'
            >
              {ProductsTab.Releases}
            </Button>
            <Button
              variant={tab === ProductsTab.DigitalArt ? 'secondary' : 'ghost'}
              onClick={() => setTab(ProductsTab.DigitalArt)}
              className='h-8 font-bold w-[110px]'
            >
              {ProductsTab.DigitalArt}
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              className='relative rounded-lg min-w-10 sm:px-0'
              variant='secondary'
              size='md'
              onClick={() => {
                console.log('Filter clicked')
              }}
            >
              <FilterIcon className='h-4 w-4' />
            </Button>
            <SortSelect />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Traits</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myProducts.map(({ asset, requestedAt, user }) => (
              <TableRow key={asset.address}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={asset.image}
                      alt=''
                      {...COMIC_ISSUE_COVER_SIZE}
                      className='rounded-sm h-auto w-10 aspect-comic-issue-cover'
                    />
                    <div className='flex flex-col'>
                      <span className='text-grey-200'>
                        {asset.comicTitle} • EP {asset.episodeNumber}
                      </span>
                      <span className='font-medium'>{asset.comicIssueTitle}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span title={new Date(requestedAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(requestedAt), { addSuffix: true, includeSeconds: true })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={user.avatar || PLACEHOLDER_AVATAR} />
                      <AvatarFallback>
                        {/** fallback to 'G' as guest */}
                        {user.displayName[0] || 'G'}
                      </AvatarFallback>
                    </Avatar>
                    {user.displayName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <RarityChip rarity={asset.rarity} compactOnMobile />
                    <UsedTraitChip used={asset.isUsed} compactOnMobile />
                    <SignedTraitChip signed={asset.isSigned} compactOnMobile />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                      onClick={() => {
                        console.log('Comic signed!')
                      }}
                    >
                      <PencilIcon className='h-4 w-4' solid />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                      onClick={() => {
                        console.log('Signature rejected!')
                      }}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
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
          <PaginationControls />
        )}
      </div>
    </div>
  )
}

export default ProductsTable
