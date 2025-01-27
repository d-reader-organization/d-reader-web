'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { ChevronDown, Settings2, Trash2, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ComicRarity } from '@/enums/comicRarity'
import { BasicCollectibleComic } from '@/models/comic/collectibleComic'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'
import Image from 'next/image'
import { usePaginationControls } from '@/hooks/usePaginationControls'

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

  console.log('MY PRODUCTS: ', { skip, take, tab })

  return (
    <div className='w-full max-w-screen-lg'>
      <Text styleVariant='secondary-heading' as='h3' className='pb-4'>
        {title}
      </Text>
      <div className='w-full max-w-screen-lg space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === ProductsTab.Series ? 'secondary' : 'ghost'}
              onClick={() => setTab(ProductsTab.Series)}
              className='h-8 font-bold'
            >
              {ProductsTab.Series}
            </Button>
            <Button
              variant={tab === ProductsTab.Releases ? 'secondary' : 'ghost'}
              onClick={() => setTab(ProductsTab.Releases)}
              className='h-8 font-bold'
            >
              {ProductsTab.Releases}
            </Button>
            <Button
              variant={tab === ProductsTab.DigitalArt ? 'secondary' : 'ghost'}
              onClick={() => setTab(ProductsTab.DigitalArt)}
              className='h-8 font-bold'
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
              <Settings2 className='h-4 w-4' />
            </Button>
            <Button
              variant='secondary'
              className='w-max min-w-10 sm:px-2 rounded-lg flex justify-center items-center gap-2'
              size='md'
            >
              <span className='max-md:hidden'>Sort by: Newest</span>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className='border-grey-400 bg-grey-500'>
              <TableHead className='pl-4'>Asset</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Traits</TableHead>
              <TableHead className='pr-4'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myProducts.map(({ asset, requestedAt, user }) => (
              <TableRow key={asset.address} className='border-grey-400'>
                <TableCell className='pl-4'>
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
                <TableCell className='pr-4'>
                  <div className='gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                      onClick={() => {
                        console.log('Comic signed!')
                      }}
                    >
                      <Pencil className='h-4 w-4' />
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
