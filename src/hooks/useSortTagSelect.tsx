import { JSX, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SortOrder } from '@/enums/sortOrder'
import { SortIcon } from '@/components/icons/theme/SortIcon'

type SortTagSelectOption = {
  tag: string
  order: SortOrder
  value: string
  label: string
}

type SortTagSelectHook = (options: SortTagSelectOption[]) => {
  SortSelect: () => JSX.Element
}

export const useSortTagSelect: SortTagSelectHook = (options) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  const SortSelect = () => (
    <Select
      value={selectedOption.value.toString()}
      onValueChange={(value) => {
        console.log('value: ', value)
        const newOption = options.find((option) => option.value === value) || options[0]
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
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return { SortSelect }
}
