import { JSX, useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeftIcon } from '@/components/icons/theme/ChevronLeftIcon'
import { ChevronRightIcon } from '@/components/icons/theme/ChevronRightIcon'

type TablePaginationHook = (options: { totalItems: number; defaultPageSize?: number }) => {
  currentPage: number
  totalPages: number
  skip: number
  take: number
  TablePagination: () => JSX.Element
}

export const useTablePagination: TablePaginationHook = ({ totalItems, defaultPageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const totalPages = Math.ceil(totalItems / pageSize)
  const skip = (currentPage - 1) * pageSize

  // whenever number of total items changes, reset the pages
  useEffect(() => {
    setCurrentPage(1)
  }, [totalItems])

  const TablePagination = () => (
    <div className='flex items-center justify-between px-4 select-none'>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          Icon={ChevronLeftIcon}
          iconOnly
        />
        <div className='flex items-center gap-2 mx-2'>
          <Text as='span' styleVariant='body-small'>
            {currentPage} / <span className='text-grey-200'>{totalPages}</span>
          </Text>
        </div>
        <Button
          variant='secondary'
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          Icon={ChevronRightIcon}
          iconOnly
        />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-grey-200'>Items per page</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setCurrentPage(1)
            setPageSize(Number(value))
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return {
    currentPage,
    totalPages,
    skip,
    take: pageSize,
    TablePagination,
  }
}
