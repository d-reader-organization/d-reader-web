'use client'

import React from 'react'
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
  const { clear, searchInputValue, updateSearchInputValue, updateSearchParam } = useDiscoverQueryStore((state) => state)
  const pathname = usePathname()

  const debouncedSetSearchTerm = useDebouncedCallback((value: string | undefined) => {
    updateSearchParam(value)
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchInputValue(e.target.value)
    debouncedSetSearchTerm(e.target.value)
  }

  const getPlaceholder = React.useCallback(() => {
    if (pathname === RoutePath.DiscoverComics) return 'Search by comics'
    if (pathname === RoutePath.DiscoverComicIssues) return 'Search by episodes'
    if (pathname === RoutePath.DiscoverCreators) return 'Search by creators'
    return 'Search'
  }, [pathname])

  return (
    <div className={cn('relative z-10 w-full', className)}>
      <Button
        Icon={searchInputValue ? CloseIcon : SearchIcon}
        variant='inline'
        iconOnly
        className='absolute top-3 left-3'
        disabled={!searchInputValue}
        onClick={clear}
      />
      <Input
        placeholder={getPlaceholder()}
        value={searchInputValue}
        className='pl-10 pr-10 w-full max-h-[42px]'
        onChange={handleInputChange}
      />
    </div>
  )
}
