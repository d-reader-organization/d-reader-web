import React from 'react'
import { Button, Text } from '@/components/ui'
import { Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type FilterButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  isFilterSheetOpen: boolean
  setFilterSheetOpen: (open: boolean) => void
  activeFiltersCount: number
  withLabel?: boolean
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  isFilterSheetOpen,
  setFilterSheetOpen,
  activeFiltersCount,
  withLabel = false,
  className,
}) => {
  return (
    <Button
      className={cn('relative', className)}
      variant='secondary'
      size='md'
      onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
    >
      <Settings2 size={18} className='max-md:hidden' />
      <Settings2 size={16} className='md:hidden' />
      {withLabel && (
        <Text as='p' styleVariant='body-small'>
          Filter
        </Text>
      )}
      {activeFiltersCount !== 0 && (
        <Text
          as='p'
          fontWeight='bold'
          styleVariant='body-xsmall'
          className='flex -top-1 -right-2 absolute justify-center items-center w-5 h-5 bg-white text-grey-600 rounded-full'
        >
          {activeFiltersCount}
        </Text>
      )}
    </Button>
  )
}
