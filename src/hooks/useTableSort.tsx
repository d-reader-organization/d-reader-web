import { JSX, useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SortIcon } from '@/components/icons/theme/SortIcon'
import { SortOption, SortOrder } from '@/enums/sort'

type TableSortHookResponse<T> = {
  value: T
  order: SortOrder
  TableSort: () => JSX.Element
}

export function useTableSort<T>(options: SortOption<T>[] = []): TableSortHookResponse<T> {
  const mappedOptions = useMemo(() => {
    return options.map((option, index) => ({ ...option, domValue: index.toString() }))
  }, [options])
  const [selectedOption, setSelectedOption] = useState(mappedOptions[0])

  // reset state whenever options change
  useEffect(() => {
    setSelectedOption(mappedOptions[0])
  }, [mappedOptions])

  const TableSort = () => (
    <Select
      value={selectedOption.domValue}
      onValueChange={(domValue) => {
        const newOption = mappedOptions.find((option) => option.domValue === domValue) || mappedOptions[0]
        setSelectedOption(newOption)
      }}
    >
      <SelectTrigger className='max-md:w-[42px] max-md:!px-0' iconClassName='max-md:hidden' asChild>
        <span className='max-md:hidden'>
          Sort by: <SelectValue />
        </span>
        <SortIcon className='h-[20px] w-[20px] md:hidden' />
      </SelectTrigger>
      <SelectContent>
        {mappedOptions.map((option) => (
          <SelectItem value={option.domValue} key={option.domValue}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return { value: selectedOption.value, order: selectedOption.order, TableSort }
}
