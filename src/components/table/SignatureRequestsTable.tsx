'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import { useRerender } from '@/hooks/useRerender'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import Image from 'next/image'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { signatureRequests } from '@/constants/dummyData'
import { usePaginationControls } from '@/hooks/usePaginationControls'
import { PencilIcon } from '@/components/icons/theme/PencilIcon'
import { ChevronDown } from '@/components/icons/theme/ChevronDown'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { SortIcon } from '@/components/icons/theme/SortIcon'

enum SignatureRequestsTab {
  Pending = 'Pending',
  Resolved = 'Resolved',
}

type Props = { title: string }

export const SignatureRequestsTable: React.FC<Props> = ({ title }) => {
  const [tab, setTab] = useState<SignatureRequestsTab>(SignatureRequestsTab.Pending)
  const isTableEmpty = signatureRequests.length === 0
  const { PaginationControls, skip, take } = usePaginationControls({ totalItems: signatureRequests.length })

  useRerender(30000)

  console.log('SIGNATURE REQUESTS: ', { skip, take, tab })

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        {title}
      </Text>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === SignatureRequestsTab.Pending ? 'secondary' : 'ghost'}
              onClick={() => setTab(SignatureRequestsTab.Pending)}
              className='h-8 font-bold'
            >
              {SignatureRequestsTab.Pending}
            </Button>
            <Button
              variant={tab === SignatureRequestsTab.Resolved ? 'secondary' : 'ghost'}
              onClick={() => setTab(SignatureRequestsTab.Resolved)}
              className='h-8 font-bold'
            >
              {SignatureRequestsTab.Resolved}
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
            <Button
              variant='secondary'
              className='w-max min-w-10 sm:px-2 rounded-lg flex justify-center items-center gap-2'
              size='md'
            >
              <span className='max-md:hidden'>Sort by: Newest</span>
              <SortIcon className='h-[20px] w-[20px] md:hidden' />
              <ChevronDown className='h-4 w-4 max-md:hidden' />
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
                  <div className='flex items-center gap-3 relative'>
                    <Image
                      src={asset.image}
                      alt=''
                      {...COMIC_ISSUE_COVER_SIZE}
                      className='rounded-sm h-auto w-10 aspect-comic-issue-cover'
                    />
                    <div className='flex flex-col max-w-[200px]'>
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
                    {/* <div className='flex flex-col max-w-[200px]'>
                      <span>{user.displayName}</span>
                      <span className='font-medium text-grey-200'>@{user.username}</span>
                    </div> */}
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
            No user requested a signature from you!
          </Text>
        ) : (
          <PaginationControls />
        )}
      </div>
    </div>
  )
}

export default SignatureRequestsTable
