import { JSX, useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { CloseIcon } from '@/components/icons/theme/CloseIcon'
import { SearchIcon } from '@/components/icons/theme/SearchIcon'
import { LoaderIcon } from '@/components/icons/theme/LoaderIcon'
import { sleep } from '@/utils/helpers'
import { Input } from '@/components/ui/Input'

type TableSearchHookResponse = {
  searchTerm: string
  TableSearch: () => JSX.Element
}

export function useTableSearch(): TableSearchHookResponse {
  const [searchTerm, setSearchTerm] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const debouncedSearch = useDebouncedCallback(async (value) => {
    if (value) {
      setIsLoading(true)
      sleep(1000)
      setIsLoading(false)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  const TableSearch = () => (
    <div className='relative z-10'>
      {searchTerm ? (
        <button className='absolute top-3 left-3' onClick={clearSearch}>
          <CloseIcon className='size-4.5 text-white' />
        </button>
      ) : (
        <SearchIcon className='size-4.5 absolute top-3 left-3 text-grey-200' />
      )}
      <Input
        placeholder='Search'
        value={searchTerm}
        className='pl-10 max-w-sm'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <LoaderIcon className={cn('size-4.5 absolute top-3 right-3 text-grey-200', isLoading ? '' : 'hidden')} />
    </div>
  )

  return { searchTerm, TableSearch }
}
