'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { ChevronDown, Copy, ListFilter, LoaderCircle, Search, Settings2, Upload, X } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import { TransactionSourceChip } from '../shared/chips/TransactionSource'
import { formatDistanceToNow } from 'date-fns'
import { toast } from '../ui/toast'
import { shortenString, sleep } from '@/utils/helpers'
import { ProductTypeChip } from '../shared/chips/ProductType'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { useRerender } from '@/hooks/useRerender'
import { transactions } from '@/constants/dummyData'
import { downloadTransactionsReportCSV } from '@/utils/csv'
import { usePaginationControls } from '@/hooks/usePaginationControls'
import { SolanaIcon } from '../icons/SolanaIcon'
// import { TransactionHistoryItem } from '@/models/transaction/transactionHistory'

// TODO: prepare API endpoints params (filter, sort, and pagination)
// TODO: change table data based on the selected tab
// TODO: edge cases: no results at all, no results from specified parameters
// TODO: filter (all?) tables by comics, episodes, and creators
// TODO: extract the logic from the SearchInput component
// TODO: fetch the full data report for CSV, unpaginated. Add the .splToken property to the TransactionHistoryItem
// TODO: finish 'My Products' table
// TODO: work on the chart table, get Athar to sort out the backend ASAP
// TODO: table responsiveness
// TODO: ICONS (Matan)
type Props = { title: string }

// const transactions: TransactionHistoryItem[] = []

export const TransactionHistoryTable: React.FC<Props> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isTableEmpty = transactions.length === 0
  const { PaginationControls, skip, take } = usePaginationControls({ totalItems: transactions.length })

  useRerender(30000)

  console.log('TRANSACTION HISTORY: ', { skip, take })

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
        <div className='flex items-center justify-between px-4'>
          <div className='relative z-10'>
            {searchTerm ? (
              <button className='absolute top-3 left-3' onClick={clearSearch}>
                <X className='size-[18px] text-white' />
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
              className='relative rounded-lg min-w-10 sm:px-0'
              variant='secondary'
              icon={Settings2}
              size='md'
              onClick={() => {
                console.log('Filter button clicked!')
              }}
            />
            <Button
              className='relative rounded-lg min-w-10 sm:px-0'
              variant='secondary'
              icon={Upload}
              size='md'
              onClick={() => {
                downloadTransactionsReportCSV(transactions)
              }}
            />
            <Button
              variant='secondary'
              className='w-max min-w-10 sm:px-2 rounded-lg flex justify-center items-center gap-2'
              size='md'
            >
              <span className='max-md:hidden'>Sort by: Newest</span>
              <ListFilter className='md:hidden' />
              <ChevronDown className='max-md:hidden' />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className='border-grey-400 bg-grey-500'>
              <TableHead className='pl-4'>Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Product link</TableHead>
              <TableHead className='pr-4'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className='border-grey-400 h-12'>
                <TableCell className='font-medium pl-4'>
                  <div className='flex items-center gap-2'>
                    <span className='w-20'>{shortenString(transaction.id)}</span>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='sm:min-w-2 p-0'
                      onClick={() => {
                        navigator.clipboard.writeText(transaction.id)
                        toast({ description: 'Copied to clipboard' })
                      }}
                    >
                      <Copy className='size-4' />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span title={new Date(transaction.confirmedAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(transaction.confirmedAt), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
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
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <span className='w-20'>{shortenString(transaction.id)}</span>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='sm:min-w-2 p-0'
                      onClick={() => {
                        navigator.clipboard.writeText(transaction.id)
                        toast({ description: 'Copied to clipboard' })
                      }}
                    >
                      <Copy className='size-4' />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2 pr-4'>
                    <SolanaIcon className='w-4 h-auto' />
                    {transaction.amount}
                  </div>
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
