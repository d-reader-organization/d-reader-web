'use client'

import { Button } from '@/components/ui/Button'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { ChevronDown, ChevronLeft, ChevronRight, Settings2, Trash2, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ComicRarity } from '@/enums/comicRarity'
import { BasicCollectibleComic } from '@/models/comic/collectibleComic'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { StateChip } from '../shared/chips/State'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import { useRerender } from '@/hooks/useRerender'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import Image from 'next/image'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'

interface SignatureRequest {
  asset: BasicCollectibleComic
  requestedAt: string
  resolvedAt?: string // TODO: should 'rejected' be considered a resolution?
  user: {
    username: string // TODO: add BasicCustomerDetails?
    displayName: string
    avatar: string
  }
}

type RequestStatus = 'pending' | 'resolved'

const signatureRequests: SignatureRequest[] = [
  {
    asset: {
      address: '1',
      name: 'Into the Grasslands #1032', // TODO: should we replace "name" with "numeration"? #1032
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
  // Add more sample data as needed
]

export function SignatureRequestsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [status, setStatus] = useState<RequestStatus>('pending')
  const totalPages = 10

  useRerender(30000)

  // TODO: filter (all?) tables by comics, episodes, and creators
  // TODO: https://www.geeksforgeeks.org/css-box-model/
  return (
    <div className='w-full max-w-screen-lg space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
      <div className='flex items-center justify-between px-4'>
        <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
          <Button
            variant={status === 'pending' ? 'secondary' : 'ghost'}
            onClick={() => setStatus('pending')}
            className='h-8 font-bold'
          >
            Pending
          </Button>
          <Button
            variant={status === 'resolved' ? 'secondary' : 'ghost'}
            onClick={() => setStatus('resolved')}
            className='h-8 font-bold'
          >
            Resolved
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            className='relative rounded-lg min-w-10 sm:px-0'
            variant='outline'
            size='md'
            onClick={() => {
              console.log('Filter clicked')
            }}
          >
            <Settings2 className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
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
          {signatureRequests.map(({ asset, requestedAt, user }) => (
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
                      {/* TODO: replace comicTitle & comicIssueTitle with <TextWithOverflow /> */}
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
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
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
                      console.log('Edit clicked')
                    }}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => {
                      console.log('Delete clicked')
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

      <div className='flex items-center justify-center gap-2'>
        <Button
          className='min-w-10'
          variant='secondary'
          size='sm'
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <div className='flex items-center gap-2 mx-2'>
          <span>
            {currentPage} / <span className='text-grey-200'>{totalPages}</span>
          </span>
        </div>
        <Button
          className='min-w-10'
          variant='secondary'
          size='sm'
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default SignatureRequestsTable
