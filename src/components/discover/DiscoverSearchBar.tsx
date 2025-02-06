'use client'

import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { CloseIcon } from '@/components/icons/theme/CloseIcon'
import { SearchIcon } from '@/components/icons/theme/SearchIcon'
import { Button } from '../ui/Button'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const DiscoverSearchBar: React.FC<Props> = ({ className }) => {
  const searchRef = useRef<HTMLDivElement>(null)
  const searchTerm = useDiscoverQueryStore((state) => state.comicParams.search)
  const setStoreSearchTerm = useDiscoverQueryStore((state) => state.updateSearch)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || undefined)
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
      <Button
        Icon={localSearchTerm ? CloseIcon : SearchIcon}
        variant='inline'
        iconOnly
        className='absolute top-3 left-3'
        disabled={!localSearchTerm}
        onClick={handleClearInput}
      />
      <Input
        placeholder={getPlaceholder()}
        value={localSearchTerm}
        className='pl-10 pr-10 w-full max-h-[42px]'
        onChange={handleInputChange}
      />
    </div>
  )
}
