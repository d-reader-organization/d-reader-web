'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import { useRerender } from '@/hooks/useRerender'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import Image from 'next/image'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { signatureRequests } from '@/constants/dummyData'
import { usePaginationControls } from '@/hooks/usePaginationControls'
import { PencilIcon } from '@/components/icons/theme/PencilIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { TrashIcon } from '@/components/icons/theme/TrashIcon'
import { useSortTagSelect } from '@/hooks/useSortTagSelect'
import { SortOrder } from '@/enums/sortOrder'

enum SignatureRequestsTab {
  Pending = 'Pending',
  Resolved = 'Resolved',
}

type Props = { title: string }

export const SignatureRequestsTable: React.FC<Props> = ({ title }) => {
  const [tab, setTab] = useState<SignatureRequestsTab>(SignatureRequestsTab.Pending)
  const isTableEmpty = signatureRequests.length === 0
  const { PaginationControls, skip, take } = usePaginationControls({ totalItems: signatureRequests.length })
  const { SortSelect } = useSortTagSelect([
    { tag: 'Newest', order: SortOrder.ASC, value: '1', label: 'Newest' },
    { tag: 'Oldest', order: SortOrder.DESC, value: '2', label: 'Oldest' },
  ])

  useRerender(30000)

  console.log('SIGNATURE REQUESTS: ', { skip, take, tab })

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        {title}
      </Text>
      <div className='w-full space-y-4 bg-grey-600 text-grey-100 border-1 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <div className='flex gap-1 border-grey-300 border-1 box-border rounded-xl px-1 items-center h-[42px]'>
            <Button
              variant={tab === SignatureRequestsTab.Pending ? 'secondary' : 'ghost'}
              onClick={() => setTab(SignatureRequestsTab.Pending)}
              className='h-8 font-bold w-[100px]'
            >
              {SignatureRequestsTab.Pending}
            </Button>
            <Button
              variant={tab === SignatureRequestsTab.Resolved ? 'secondary' : 'ghost'}
              onClick={() => setTab(SignatureRequestsTab.Resolved)}
              className='h-8 font-bold w-[100px]'
            >
              {SignatureRequestsTab.Resolved}
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              className='relative rounded-lg sm:px-0'
              variant='secondary'
              Icon={FilterIcon}
              onClick={() => {
                console.log('Filter button clicked!')
              }}
            />
            <SortSelect />
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
            {signatureRequests.map(({ asset, requestedAt, user }) => (
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
                  </div>
                </TableCell>
                <TableCell>
                  <span title={new Date(requestedAt).toLocaleString()} className='text-nowrap'>
                    {formatDistanceToNow(new Date(requestedAt), { addSuffix: true, includeSeconds: true })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex justify-end gap-2'>
                    <Button
                      iconClassname='m-auto'
                      variant='ghost'
                      Icon={PencilIcon}
                      solid
                      onClick={() => {
                        console.log('Comic signed!')
                      }}
                    />
                    <Button
                      iconClassname='m-auto'
                      variant='ghost'
                      Icon={TrashIcon}
                      solid
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
