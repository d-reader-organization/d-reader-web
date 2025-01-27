import { JSX, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationControlsHook = (options: { totalItems: number; defaultPageSize?: number }) => {
  currentPage: number
  totalPages: number
  skip: number
  take: number
  PaginationControls: () => JSX.Element
}

export const usePaginationControls: PaginationControlsHook = ({ totalItems, defaultPageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const totalPages = Math.ceil(totalItems / pageSize)
  const skip = (currentPage - 1) * pageSize

  const PaginationControls = () => (
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
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setCurrentPage(1)
            setPageSize(Number(value))
          }}
        >
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
  )

  return {
    currentPage,
    totalPages,
    skip,
    take: pageSize,
    PaginationControls,
  }
}
