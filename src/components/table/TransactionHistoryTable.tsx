'use client'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR, SORT_OPTIONS } from '@/constants/general'
import { TransactionSourceChip } from '../shared/chips/TransactionSourceChip'
import { formatDistanceToNow } from 'date-fns'
import { shortenString } from '@/utils/helpers'
import { ProductTypeChip } from '../shared/chips/ProductTypeChip'
import { useRerender } from '@/hooks/useRerender'
import { transactions } from '@/constants/dummyData'
import { downloadTransactionsReportCSV } from '@/utils/csv'
import { useTablePagination } from '@/hooks/useTablePagination'
import { SolanaIcon } from '../icons/SolanaIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { ExportIcon } from '@/components/icons/theme/ExportIcon'
import { useTableSort } from '@/hooks/useTableSort'
import { CopyButton } from '../shared/CopyButton'
import { useTableSearch } from '@/hooks/useTableSearch'

// TODO (Luka)
// <TableNoContent />
// ActivityFeed
// filter functionality (drawers/sheets)
// change table data based on the selected tab

type Props = { title: string }

export const TransactionHistoryTable: React.FC<Props> = ({ title }) => {
  const isTableEmpty = transactions.length === 0
  const { TablePagination, skip, take } = useTablePagination({ totalItems: transactions.length })
  const { TableSort, tag: sortTag, order: sortOrder } = useTableSort(SORT_OPTIONS.TRANSACTION_HISTORY)
  const { TableSearch, searchTerm } = useTableSearch()

  useRerender(30000)
  console.log('TRANSACTION HISTORY: ', { sortTag, sortOrder, searchTerm, skip, take })

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        {title}
      </Text>
      <div className='space-y-4 bg-grey-600 text-grey-100 border-2 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <TableSearch />
          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              Icon={ExportIcon}
              iconOnly
              onClick={() => {
                downloadTransactionsReportCSV(transactions)
              }}
            />
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
              <TableHead>Transaction</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className='h-12'>
                <TableCell>
                  <div className='flex items-center font-medium gap-2'>
                    <span className='w-20'>{shortenString(transaction.id)}</span>
                    <CopyButton variant='inline' clipboard={transaction.id} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2 text-nowrap'>
                    <Avatar className='size-6'>
                      <AvatarImage src={transaction.buyer?.avatar || PLACEHOLDER_AVATAR} />
                      <AvatarFallback>
                        {/** fallback to 'G' as guest */}
                        {transaction.buyer?.displayName[0] || 'G'}
                      </AvatarFallback>
                    </Avatar>
                    {transaction.buyer?.displayName || 'Guest'}
                  </div>
                </TableCell>
                <TableCell>
                  <TransactionSourceChip source={transaction.source} />
                </TableCell>
                <TableCell>
                  <ProductTypeChip type={transaction.product} />
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <SolanaIcon className='w-4 h-auto' />
                    {transaction.amount}
                  </div>
                </TableCell>
                <TableCell>
                  <span title={new Date(transaction.confirmedAt).toLocaleString()} className='text-nowrap'>
                    {formatDistanceToNow(new Date(transaction.confirmedAt), { addSuffix: true, includeSeconds: true })}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isTableEmpty ? (
          <Text as='p' styleVariant='secondary-heading' className='text-center text-white py-12'>
            Nothing to see here... yet ;)
          </Text>
        ) : (
          <TablePagination />
        )}
      </div>
    </div>
  )
}

export default TransactionHistoryTable
