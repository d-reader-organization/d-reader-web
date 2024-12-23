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
}) => (
  <Button
    className={cn('relative rounded-[10px]', withLabel ? 'min-w-[100px]' : 'min-w-10 sm:px-0', className)}
    variant='secondary'
    icon={Settings2}
    size='md'
    onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
  >
    {withLabel && (
      <Text as='span' styleVariant='body-small'>
        Filter
      </Text>
    )}
    {activeFiltersCount !== 0 && (
      <Text
        as='span'
        fontWeight='bold'
        styleVariant='body-xsmall'
        className='flex -top-1 -right-1 absolute justify-center items-center w-4 h-4 bg-white text-grey-600 rounded-full leading-none'
      >
        {activeFiltersCount}
      </Text>
    )}
  </Button>
)
