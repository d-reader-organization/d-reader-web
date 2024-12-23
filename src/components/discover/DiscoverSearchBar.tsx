'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const DiscoverSearchBar: React.FC<Props> = ({ className }) => {
  const searchRef = React.useRef<HTMLDivElement>(null)
  const searchTerm = useDiscoverQueryStore((state) => state.comicParams.search)
  const setStoreSearchTerm = useDiscoverQueryStore((state) => state.updateSearch)
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm || undefined)
  const pathname = usePathname()

  const debouncedSetSearchTerm = useDebouncedCallback((value: string | undefined) => {
    setStoreSearchTerm(value)
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value)
    debouncedSetSearchTerm(e.target.value)
  }

  const handleClearInput = () => {
    setLocalSearchTerm('')
    setStoreSearchTerm(undefined)
  }

  const getPlaceholder = React.useCallback(() => {
    if (pathname === RoutePath.DiscoverComics) return 'Search by comics'
    if (pathname === RoutePath.DiscoverComicIssues) return 'Search by episodes'
    if (pathname === RoutePath.DiscoverCreators) return 'Search by creators'
    return 'Search'
  }, [pathname])

  return (
    <div className={cn('relative z-10 w-full', className)} ref={searchRef}>
      {localSearchTerm ? (
        <button className='absolute top-3 left-3' onClick={handleClearInput}>
          <X className='size-[18px] text-white' />
        </button>
      ) : (
        <Search className='size-[18px] absolute top-3 left-3 text-grey-200' />
      )}
      <Input
        placeholder={getPlaceholder()}
        value={localSearchTerm}
        className='pl-10 pr-10 w-full max-w-[100%] max-h-[42px]'
        onChange={handleInputChange}
      />
    </div>
  )
}
