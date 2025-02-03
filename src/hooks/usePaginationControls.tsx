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
          variant='secondary'
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          Icon={ChevronLeft}
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
          Icon={ChevronRight}
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
    PaginationControls,
  }
}
