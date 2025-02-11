import { useDashboardStore } from '@/providers/DashboardStoreProvider'
import { useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SortIcon } from '../icons/theme/SortIcon'

export const TableSort: React.FC = () => {
  const { sortOptions: options, updateSortParams } = useDashboardStore((state) => state)
  const mappedOptions = useMemo(() => {
    return options.map((option, index) => ({ ...option, domValue: index.toString() }))
  }, [options])
  const [selectedOption, setSelectedOption] = useState(mappedOptions[0])

  return (
    <Select
      value={selectedOption.domValue}
      onValueChange={(domValue) => {
        const newOption = mappedOptions.find((option) => option.domValue === domValue) || mappedOptions[0]
        updateSortParams({
          sortOrder: newOption.order,
          sortTag: newOption.value,
        })
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
}
