import { useDashboardStore } from '@/providers/TableStoreProvider'
import { Button } from '../ui/Button'
import { Text } from '../ui/Text'
import { ChevronLeftIcon } from '../icons/theme/ChevronLeftIcon'
import { ChevronRightIcon } from '../icons/theme/ChevronRightIcon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const TablePagination: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    take: pageSize,
    setTakePerPage,
  } = useDashboardStore((state) => state)
  return (
    <div className='flex items-center justify-between px-4 select-none'>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
            setTakePerPage(Number(value))
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
}
