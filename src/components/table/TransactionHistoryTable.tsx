'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { LoaderCircle, Search, Upload } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { TransactionSourceChip } from '../shared/chips/TransactionSource'
import { formatDistanceToNow } from 'date-fns'
import { shortenString, sleep } from '@/utils/helpers'
import { ProductTypeChip } from '../shared/chips/ProductType'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { useRerender } from '@/hooks/useRerender'
import { transactions } from '@/constants/dummyData'
import { downloadTransactionsReportCSV } from '@/utils/csv'
import { usePaginationControls } from '@/hooks/usePaginationControls'
import { SolanaIcon } from '../icons/SolanaIcon'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { CloseIcon } from '@/components/icons/theme/CloseIcon'
import { useSortTagSelect } from '@/hooks/useSortTagSelect'
import { TransactionHistorySortTag } from '@/models/transaction/transactionHistory'
import { SortOrder } from '@/enums/sortOrder'
import { CopyButton } from '../shared/CopyButton'

// TODO: change table data based on the selected tab
// TODO: edge cases: no results at all, no results from specified parameters
// TODO: extract the logic from the SearchInput component
// TODO: finish 'My Products' table
// TODO: use AvatarImage component instead of the one from Shadcn?
// TODO: Sidebar Avatar is a dropdown for settings & logout
// TODO: look into 'solid' issue: Received `false` for a non-boolean attribute `solid`.

// TODO: replace chart with PieChart, Bars, or something similar
// TODO: prepare API endpoints params (filter, sort, and pagination)
// TODO: filter (all?) tables by comics, episodes, and creators
// TODO: fetch the full data report for CSV, unpaginated. Add the .splToken property to the TransactionHistoryItem
type Props = { title: string }

export const TransactionHistoryTable: React.FC<Props> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isTableEmpty = transactions.length === 0
  const { PaginationControls, skip, take } = usePaginationControls({ totalItems: transactions.length })
  const { SortSelect } = useSortTagSelect([
    { tag: TransactionHistorySortTag.Date, order: SortOrder.ASC, value: '1', label: 'Newest' },
    { tag: TransactionHistorySortTag.Date, order: SortOrder.DESC, value: '2', label: 'Oldest' },
    { tag: TransactionHistorySortTag.Amount, order: SortOrder.ASC, value: '3', label: 'Highest Am' },
    { tag: TransactionHistorySortTag.Amount, order: SortOrder.DESC, value: '4', label: 'Lowest Am' },
  ])

  useRerender(30000)

  console.log('TRANSACTION HISTORY: ', { searchTerm, skip, take })

  const debouncedSearch = useDebouncedCallback(async (value) => {
    if (value) {
      setIsLoading(true)
      sleep(1000)
      setIsLoading(false)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  return (
    <div className='w-full'>
      <Text styleVariant='secondary-heading' as='h4' className='pb-4'>
        {title}
      </Text>
      <div className='space-y-4 bg-grey-600 text-grey-100 border-2 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <div className='relative z-10'>
            {searchTerm ? (
              <button className='absolute top-3 left-3' onClick={clearSearch}>
                <CloseIcon className='size-[18px] text-white' solid />
              </button>
            ) : (
              <Search className='size-[18px] absolute top-3 left-3 text-grey-200' />
            )}
            <Input
              placeholder='Search'
              value={searchTerm}
              className='pl-10 max-w-sm'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <LoaderCircle
              className={cn('size-[18px] animate-spin absolute top-3 right-3 text-grey-200', isLoading ? '' : 'hidden')}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Button
              className='relative rounded-lg sm:px-0'
              variant='secondary'
              Icon={Upload}
              onClick={() => {
                downloadTransactionsReportCSV(transactions)
              }}
            />
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
              <TableHead>Transaction</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Product</TableHead>
              {/* <TableHead>Product link</TableHead> */}
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
                    <Avatar className='h-6 w-6'>
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
                {/* <TableCell>
                  <div className='flex items-center gap-2'>
                    <span className='w-20'>{shortenString(transaction.id)}</span>
                    <CopyButton variant='inline' clipboard={transaction.id} />
                  </div>
                </TableCell> */}
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
          <PaginationControls />
        )}
      </div>
    </div>
  )
}

export default TransactionHistoryTable
