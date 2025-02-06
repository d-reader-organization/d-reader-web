import React from 'react'
import { Button, Text } from '@/components/ui'
import { FilterIcon } from '@/components/icons/theme/FilterIcon'
import { cn } from '@/lib/utils'

type FilterButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  toggleFilterSheet: () => void
  activeFiltersCount: number
}

export const FilterButton: React.FC<FilterButtonProps> = ({ toggleFilterSheet, activeFiltersCount, className }) => (
  <Button
    className={cn('relative min-w-20', className)}
    variant='secondary'
    Icon={FilterIcon}
    onClick={toggleFilterSheet}
  >
    Filter
    {activeFiltersCount !== 0 && (
      <Text
        as='span'
        fontWeight='bold'
        styleVariant='body-xsmall'
        className='flex -top-1 -right-1 absolute justify-center items-center size-4 bg-white text-grey-600 rounded-full leading-none'
      >
        {activeFiltersCount}
      </Text>
    )}
  </Button>
)
