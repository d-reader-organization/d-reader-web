'use client'

import { Button, Text } from '@/components/ui'
import { DiscoverSearchBar } from './DiscoverSearchBar'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { ChevronDownIcon } from '@/components/icons/theme/ChevronDownIcon'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {
  ALL_DISCOVER_PAGE_QUERY_CRITERIA,
  QUERY_COMIC_CRITERIA,
  QUERY_COMIC_ISSUE_CRITERIA,
  QUERY_CREATOR_CRITERIA,
} from '@/constants/discoverQueryCriteria'
import { useDiscoverStoreActiveFiltersCount } from '@/hooks/useDiscoverStoreActiveFiltersCount'
import { FilterButton } from './FilterButton'
import { useToggle } from '@/hooks'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { RoutePath } from '@/enums/routePath'

export const DiscoverQueryBar: React.FC = () => {
  const [isFilterSheetOpen, toggleFilterSheet] = useToggle()
  const activeFiltersCount = useDiscoverStoreActiveFiltersCount()
  const clear = useDiscoverQueryStore((state) => state.clear)

  // TODO: clear should also clear the search input
  return (
    <div className='flex'>
      <QuerySheet isOpen={isFilterSheetOpen} toggleFilterSheet={toggleFilterSheet} />
      <div className='flex gap-1 md:gap-2 w-[100%]'>
        <DiscoverSearchBar />
        <FilterButton toggleFilterSheet={toggleFilterSheet} activeFiltersCount={activeFiltersCount} />
        <Button onClick={clear} variant='secondary' className='min-w-20 whitespace-nowrap'>
          Clear
        </Button>
      </div>
    </div>
  )
}

type QuerySheetProps = {
  isOpen: boolean
  toggleFilterSheet: () => void
}

const QuerySheet: React.FC<QuerySheetProps> = ({ isOpen, toggleFilterSheet }) => {
  const pathname = usePathname()

  const queryCriteria = React.useMemo(() => {
    switch (pathname) {
      case RoutePath.DiscoverComics:
        return QUERY_COMIC_CRITERIA
      case RoutePath.DiscoverComicIssues:
        return QUERY_COMIC_ISSUE_CRITERIA
      case RoutePath.DiscoverCreators:
        return QUERY_CREATOR_CRITERIA
    }
  }, [pathname])

  if (!queryCriteria) return null

  return (
    <div className='max-md:hidden'>
      <Sheet open={isOpen} onOpenChange={toggleFilterSheet}>
        <SheetTitle className='sr-only'>Open menu</SheetTitle>
        <SheetContent
          aria-describedby={undefined}
          side='left'
          className='p-6 flex flex-col h-full w-full bg-grey-600 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] max-w-[420px]'
        >
          <Text as='span' styleVariant='body-large' fontWeight='bold' className='body-normal'>
            Search parameters
          </Text>
          <div className='flex flex-col'>
            {queryCriteria.map((criteria, index) => (
              <DiscoverQueryBySingleTag key={index} queryCriteria={criteria} />
            ))}
            <DiscoverQueryByGenres />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export type DiscoverQueryBySingleTagProps = {
  queryCriteria: ALL_DISCOVER_PAGE_QUERY_CRITERIA
}

export const DiscoverQueryBySingleTag = ({ queryCriteria }: DiscoverQueryBySingleTagProps) => {
  const store = useDiscoverQueryStore((state) => state)
  const [isExpanded, setIsExpanded] = useState(true)

  const selectedTag = queryCriteria.getSelectedTags(store)

  const handleTagClick = <K extends keyof (typeof queryCriteria)['tags']>(
    key: K,
    tag: (typeof queryCriteria)['tags'][K]
  ) => {
    const newTag: (typeof queryCriteria)['tags'][K] | undefined = selectedTag === tag ? undefined : tag
    queryCriteria.updateSelectedTags(store, newTag)
  }

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className={cn('border-t border-grey-300', isExpanded && 'border-b-0')}
    >
      <CollapsibleTrigger className='flex justify-between items-center w-full text-left py-4 focus:outline-none'>
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='max-sm:text-base'>
          {queryCriteria.label}
        </Text>
        <ChevronDownIcon className='size-4.5' />
      </CollapsibleTrigger>

      <CollapsibleContent className='pb-4'>
        <div className='flex flex-wrap gap-2'>
          {Object.keys(queryCriteria.tags).map((key) => {
            const typedKey = key as keyof (typeof queryCriteria)['tags']
            const value = queryCriteria.tags[typedKey]
            const isSelected = selectedTag === value

            return (
              <div
                key={key}
                className={cn(
                  'flex justify-center items-center p-2 px-3 rounded-lg cursor-pointer',
                  isSelected ? 'bg-white text-black' : 'bg-grey-500 text-grey-100'
                )}
                onClick={() => handleTagClick(typedKey, value)}
              >
                <Text as='p' styleVariant='body-normal' className='max-sm:text-sm'>
                  {key}
                </Text>
              </div>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const DiscoverQueryByGenres: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const genres = useDiscoverQueryStore((state) => state.completeGenresList)
  const updateAllParamGenreSlugs = useDiscoverQueryStore((store) => store.updateAllParamGenreSlugs)
  let selectedTags = useDiscoverQueryStore((store) => store.comicParams.genreSlugs)

  const handleTagClick = (tag: string) => {
    switch (true) {
      case !selectedTags:
        selectedTags = [tag]
        break
      case selectedTags?.includes(tag):
        selectedTags = selectedTags.filter((t) => t !== tag)
        break
      default:
        selectedTags = [...selectedTags, tag]
    }
    updateAllParamGenreSlugs(selectedTags)
  }

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className={cn('border-t border-grey-300', isExpanded && 'border-b-0')}
    >
      <CollapsibleTrigger className='flex justify-between items-center w-full text-left py-4 focus:outline-none'>
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='max-sm:text-base'>
          Genres
        </Text>
        <ChevronDownIcon className='size-4.5' />
      </CollapsibleTrigger>

      <CollapsibleContent className='pb-4'>
        <div className='flex flex-wrap gap-2'>
          {genres?.map((tag, index) => (
            <div
              className={cn(
                'flex justify-center items-center p-2 px-3 rounded-lg cursor-pointer',
                selectedTags?.includes(tag.slug) ? 'bg-white text-black' : 'bg-grey-500 text-grey-100'
              )}
              key={tag.slug + index}
              onClick={() => handleTagClick(tag.slug)}
            >
              <Text as='span' styleVariant='body-normal' className='max-sm:text-sm'>
                {tag.name}
              </Text>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
