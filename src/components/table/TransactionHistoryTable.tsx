'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Text } from '@/components/ui/Text'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/Table'
import { ChevronDown, ChevronLeft, ChevronRight, Copy, ListFilter, Search, Settings2, Upload, X } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import SolanaIcon from 'public/assets/vector-icons/solana-icon.svg'
import { TransactionSourceChip } from '../shared/chips/TransactionSource'
import { TransactionSource } from '@/enums/transactionSource'
import { formatDistanceToNow } from 'date-fns'
import { toast } from '../ui/toast'
import { shortenString, sleep } from '@/utils/helpers'
import { ProductType } from '@/enums/productType'
import { ProductTypeChip } from '../shared/chips/ProductType'
import { useDebouncedCallback } from 'use-debounce'
import LoadingSpinner from 'public/assets/vector-icons/loading-spinner.svg'
import { cn } from '@/lib/utils'
import { useRerender } from '@/hooks/useRerender'
import { BasicUser } from '@/models/user'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export type TransactionItem = {
  id: string
  confirmedAt: string
  buyer?: BasicUser
  buyerAddress: string
  source: TransactionSource
  product: ProductType
  amount: string
}

const transactions: TransactionItem[] = [
  {
    id: 'drea1sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76aAzn',
    confirmedAt: '2025-01-25T12:00:00Z',
    buyer: {
      id: 1,
      username: 'studio_nx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea2sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7LoZy',
    confirmedAt: '2025-01-23T12:00:00Z',
    buyer: {
      id: 2,
      username: 'josipv',
      displayName: 'josipv',
      avatar: '/assets/images/invest/degen-apes-avatar.png',
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea3sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7GhT6',
    confirmedAt: '2025-01-11T12:00:00Z',
    buyer: {
      id: 3,
      username: 'athar',
      displayName: 'Athar',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Sale,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea4sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76af1i',
    confirmedAt: '2024-12-22T12:00:00Z',
    buyer: undefined,
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Sale,
    product: ProductType.DigitalArt,
    amount: '200.67',
  },
  {
    id: 'drea1sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76aBz1',
    confirmedAt: '2025-01-25T12:00:00Z',
    buyer: {
      id: 4,
      username: 'studio_nx',
      displayName: 'Studio NX',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea2sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7LF6ZW',
    confirmedAt: '2025-01-23T12:00:00Z',
    buyer: undefined,
    buyerAddress: '8rT9uC6zrM6W63r5HMK83hRbwkmtsDh7CQXSwVTxeXwQ',
    source: TransactionSource.Sale,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea3sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu7Gki9',
    confirmedAt: '2025-01-11T12:00:00Z',
    buyer: {
      id: 6,
      username: 'athar',
      displayName: 'Athar',
      avatar: '/assets/logo.png',
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Sale,
    product: ProductType.Comic,
    amount: '200.67',
  },
  {
    id: 'drea4sS7aLBCrbn4jDNSxLLJYRRnKbkqA5cu76aUz1',
    confirmedAt: '2024-12-22T12:00:00Z',
    buyer: {
      id: 8,
      username: 'johndoe1',
      displayName: 'John Doe',
      avatar: PLACEHOLDER_AVATAR,
    },
    buyerAddress: '7aLBCrbn4jDNSxLLJYRRnKbkqA5cuaeaAzn74xS7eKPD',
    source: TransactionSource.Royalty,
    product: ProductType.DigitalArt,
    amount: '200.67',
  },
]

// TODO: edge cases (ie. no results found for specified parameters OR no results found at all)
// TODO: prepare API endpoints with mock const data & params (filter, sort, and page)
// TODO: filter (all?) tables by comics, episodes, and creators

type Props = { title: string }

export const TransactionHistoryTable: React.FC<Props> = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const totalPages = 104

  useRerender(30000)

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
    <div className='w-full max-w-screen-lg'>
      <Text styleVariant='secondary-heading' as='h3' className='pb-4'>
        {title}
      </Text>
      <div className='space-y-4 bg-grey-600 text-grey-100 border-2 border-grey-400 py-4 rounded-xl'>
        <div className='flex items-center justify-between px-4'>
          <div className='relative z-10'>
            {/* TODO: extract the logic from the SearchInput component and use it here */}
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
            <LoadingSpinner
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
                // TODO: export csv
                console.log('Export button clicked!')
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
                    {formatDistanceToNow(new Date(transaction.confirmedAt), { addSuffix: true, includeSeconds: true })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      {/* TODO: handle "no customer" vs "customer with no avatar" cases on backend? */}
                      <AvatarImage src={transaction.buyer?.avatar} />
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

        <div className='flex items-center justify-between px-4 select-none'>
          <div className='flex items-center gap-2'>
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
              <Text as='span' styleVariant='body-small'>
                {currentPage} / <span className='text-grey-200'>{totalPages}</span>
              </Text>
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
          <div className='flex items-center gap-2'>
            <span className='text-sm text-grey-200'>Items per page</span>
            <Select defaultValue='10'>
              <SelectTrigger className='w-16 bg-grey-300 bg-opacity-30 border-t border-white border-opacity-10 text-grey-100'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-grey-300 text-grey-100 outline-none'>
                <SelectItem value='5'>5</SelectItem>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='50'>50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistoryTable
