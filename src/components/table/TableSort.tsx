import { useDashboardStore } from '@/providers/TableStoreProvider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SortIcon } from '../icons/theme/SortIcon'
import { SortOrder } from '@/enums/sort'

export const TableSort: React.FC = () => {
  const { updateSortParams, sortOptions, sortTag, sortOrder } = useDashboardStore((state) => state)

  const constructSelectValue = (option: { value: string; order: SortOrder }) => `${option.value}_${option.order}`

  return (
    <Select
      value={constructSelectValue({ order: sortOrder, value: sortTag })}
      onValueChange={(value) => {
        const newOption = sortOptions.find((option) => constructSelectValue(option) === value) || sortOptions[0]
        updateSortParams({
          sortOrder: newOption.order,
          sortTag: newOption.value,
        })
      }}
    >
      <SelectTrigger className='max-md:w-[42px] max-md:!px-0' iconClassName='max-md:hidden' asChild>
        <span className='max-md:hidden'>
          Sort by: <SelectValue />
        </span>
        <SortIcon className='h-[20px] w-[20px] md:hidden' />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => {
          const value = constructSelectValue(option)
          return (
            <SelectItem value={value} key={value}>
              {option.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
