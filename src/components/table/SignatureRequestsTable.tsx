'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ASPECT_RATIO, PLACEHOLDER_AVATAR, SORT_OPTIONS } from '@/constants/general'
import { RarityChip } from '../shared/chips/RarityChip'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { TextWithOverflow } from '../ui/TextWithOverflow'
import { useTablePagination } from '@/hooks/useTablePagination'
import { PencilIcon } from '@/components/icons/theme/PencilIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { TrashIcon } from '@/components/icons/theme/TrashIcon'
import { useTableSort } from '@/hooks/useTableSort'
import { useTableTabs } from '@/hooks/useTableTabs'
import { useFetchSignatureRequests } from '@/api/asset/queries'
import { SignatureRequestsTab } from '@/enums/signatureRequest'

type Props = { title: string; creatorId?: number; accessToken: string }

export const SignatureRequestsTable: React.FC<Props> = ({ title, creatorId, accessToken }) => {
  const [totalItems, setTotalItems] = useState<number>(0)
  const { TableTabs, tab } = useTableTabs([SignatureRequestsTab.Pending, SignatureRequestsTab.Resolved])
  const { TablePagination, skip, take } = useTablePagination({ totalItems })
  const { data: paginatedRequests } = useFetchSignatureRequests({ accessToken, params: { creatorId, skip, take, status: tab } })

  const isTableEmpty = totalItems == 0
  useEffect(() => {
    setTotalItems(paginatedRequests?.totalItems || 0)
  }, [paginatedRequests])

  const selectOptions = useMemo(() => {
    switch (tab) {
      case SignatureRequestsTab.Pending:
        return SORT_OPTIONS.PENDING_SIGNATURE_REQUESTS
      case SignatureRequestsTab.Resolved:
        return SORT_OPTIONS.RESOLVED_SIGNATURE_REQUESTS
    }
  }, [tab])
  const { TableSort, tag: sortTag, order: sortOrder } = useTableSort(selectOptions)

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
            {paginatedRequests?.data.map(({ requestedAt, user, collectibleComic }) => (
              <TableRow key={collectibleComic.address}>
                <TableCell>
                  <div className='flex items-center gap-2 relative'>
                    <Image
                      src={collectibleComic.image}
                      alt=''
                      {...ASPECT_RATIO.COMIC_ISSUE_COVER}
                      className='rounded-sm h-14 w-auto aspect-comic-issue-cover'
                    />
                    <div className='flex flex-col w-full max-w-[240px] lg:max-w-[320px] pr-12'>
                      <TextWithOverflow as='span' styleVariant='body-small' className='text-grey-200'>
                        {collectibleComic.comicTitle}
                      </TextWithOverflow>
                      <TextWithOverflow as='span' styleVariant='body-small' fontWeight='medium'>
                        {collectibleComic.name}
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
                    <RarityChip rarity={collectibleComic.rarity} compactOnMobile />
                    <UsedTraitChip used={collectibleComic.isUsed} compactOnMobile />
                  </div>
                </TableCell>
                <TableCell>
                  <span title={new Date(requestedAt).toString()} className='text-nowrap'>
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
