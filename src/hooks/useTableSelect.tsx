import { JSX, useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectOption } from '@/enums/select'

type TableSelectHookResponse<T> = {
  value: T
  TableSelect: () => JSX.Element
}

export function useTableSelect<T>(options: SelectOption<T>[] = []): TableSelectHookResponse<T> {
  const mappedOptions = useMemo(() => {
    return options.map((option, index) => ({ ...option, domValue: index.toString() }))
  }, [options])
  const [selectedOption, setSelectedOption] = useState(mappedOptions[0])

  // reset state whenever options change
  useEffect(() => {
    setSelectedOption(mappedOptions[0])
  }, [mappedOptions])

  const TableSelect = () => (
    <Select
      value={selectedOption.domValue}
      onValueChange={(domValue) => {
        const newOption = mappedOptions.find((option) => option.domValue === domValue) || mappedOptions[0]
        setSelectedOption(newOption)
      }}
    >
      <SelectTrigger asChild>
        <SelectValue />
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

  return { value: selectedOption.value, TableSelect }
}
