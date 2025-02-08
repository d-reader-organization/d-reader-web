'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import React, { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR, SORT_OPTIONS } from '@/constants/general'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import { useRerender } from '@/hooks/useRerender'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import Image from 'next/image'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { signatureRequests } from '@/constants/dummyData'
import { useTablePagination } from '@/hooks/useTablePagination'
import { PencilIcon } from '@/components/icons/theme/PencilIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { TrashIcon } from '@/components/icons/theme/TrashIcon'
import { useTableSort } from '@/hooks/useTableSort'
import { useTableTabs } from '@/hooks/useTableTabs'

enum SignatureRequestsTab {
  Pending = 'Pending',
  Resolved = 'Resolved',
}

type Props = { title: string }

export const SignatureRequestsTable: React.FC<Props> = ({ title }) => {
  const isTableEmpty = signatureRequests.length === 0
  const { TableTabs, tab } = useTableTabs([SignatureRequestsTab.Pending, SignatureRequestsTab.Resolved])
  const { TablePagination, skip, take } = useTablePagination({ totalItems: signatureRequests.length })
  const selectOptions = useMemo(() => {
    switch (tab) {
      case SignatureRequestsTab.Pending:
        return SORT_OPTIONS.PENDING_SIGNATURE_REQUESTS
      case SignatureRequestsTab.Resolved:
        return SORT_OPTIONS.RESOLVED_SIGNATURE_REQUESTS
    }
  }, [tab])
  const { TableSort, value: sortTag, order: sortOrder } = useTableSort(selectOptions)

  useRerender(30000)
  console.log('SIGNATURE REQUESTS: ', { sortTag, sortOrder, skip, take })

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
            No user requested a signature from you!
          </Text>
        ) : (
          <TablePagination />
        )}
      </div>
    </div>
  )
}

export default SignatureRequestsTable
