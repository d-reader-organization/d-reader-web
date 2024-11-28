'use client'

import { Button, Text } from '@/components/ui'
import { SearchInput } from './DiscoverSearchBar'
import React from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Settings2, ChevronDown } from 'lucide-react'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ALL_DISCOVER_PAGE_QUERY_CRITERIA, QUERY_CRITERIA_MAP } from '@/constants/discoverQueryCriteria'
import { useDiscoverStoreActiveFiltersCount } from '@/hooks/useDiscoverStoreActiveFiltersCount'

export const DiscoverQueryBar: React.FC = () => {
  const [isFilterSheetOpen, setFilterSheetOpen] = React.useState<boolean>(false)
  const clearAll = useDiscoverQueryStore((state) => state.resetToDefaultInitState)
  const activeFiltersCount = useDiscoverStoreActiveFiltersCount()

  return (
    <div className='flex'>
      <QuerySheet isOpen={isFilterSheetOpen} triggerOpenChange={(open: boolean) => setFilterSheetOpen(open)} />
      <div className='flex gap-4 w-[100%] max-md:justify-center'>
        <Button
          className='relative max-h-10 flex text-grey-100 bg-grey-500 gap-2'
          onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
        >
          <Settings2 size={19} />
          <Text as='p' styleVariant='body-normal'>
            Filter
          </Text>
          {activeFiltersCount !== 0 && (
            <Text
              as='p'
              fontWeight='bold'
              styleVariant='body-small'
              className='flex -top-1 -right-2 absolute justify-center items-center w-5 h-5 bg-white text-grey-600 rounded-full'
            >
              {activeFiltersCount}
            </Text>
          )}
        </Button>
        <Button onClick={clearAll} className='max-h-10 bg-grey-500 text-grey-100'>
          <Text as='p' styleVariant='body-normal'>
            Clear all
          </Text>
        </Button>
        <SearchInput className='max-md:hidden' />
        <Button
          className='max-h-10 p-4 flex justify-center items-center bg-grey-500 text-grey-100 gap-2'
          onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
        >
          <Text as='p' styleVariant='body-normal'>
            Sort by
          </Text>
          <ChevronDown size={19} />
        </Button>
      </div>
    </div>
  )
}

type QuerySheetProps = {
  isOpen: boolean
  triggerOpenChange: (open: boolean) => void
}

const QuerySheet: React.FC<QuerySheetProps> = ({ isOpen, triggerOpenChange }) => {
  const pathname = usePathname()
  const isValidKey = (key: string): key is keyof typeof QUERY_CRITERIA_MAP => key in QUERY_CRITERIA_MAP

  const queryCriteria = React.useMemo(() => {
    const matchedKey = Object.keys(QUERY_CRITERIA_MAP).find((key) => pathname.includes(key))

    if (!matchedKey || !isValidKey(matchedKey)) {
      throw new Error('Invalid pathname')
    }

    return QUERY_CRITERIA_MAP[matchedKey]
  }, [pathname])

  return (
    <div className='max-md:hidden'>
      <Sheet open={isOpen} onOpenChange={triggerOpenChange}>
        <SheetTitle className='sr-only'>Open menu</SheetTitle>
        <SheetContent
          aria-describedby={undefined}
          side='left'
          showCloseIcon
          className='p-6 flex flex-col h-full w-full bg-grey-600 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] max-w-[420px]'
          onInteractOutside={() => triggerOpenChange(false)}
        >
          <Text as='p' styleVariant='body-xlarge' fontWeight='bold'>
            Filter by
          </Text>
          <div className='flex flex-col'>
            {queryCriteria.map(({ id, criteria }) => (
              <DiscoverQueryBySingleTag key={id} queryCriteria={criteria} />
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
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = React.useState(true)

  const selectedTag = queryCriteria.getSelectedTags(store)

  const handleTagClick = <K extends keyof (typeof queryCriteria)['tags']>(
    key: K,
    tag: (typeof queryCriteria)['tags'][K]
  ) => {
    const newTag: (typeof queryCriteria)['tags'][K] | undefined = selectedTag === tag ? undefined : tag
    queryCriteria.updateSelectedTags(store, newTag)
  }

  return (
    <div className={cn('border-t border-grey-300', isExpanded && 'border-b-0 pb-4')}>
      <button
        className='flex justify-between items-center w-full text-left py-4 focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <Text as='p' styleVariant='body-large'>
          {queryCriteria.label}
        </Text>
        <ChevronDown size={19} />
      </button>
      <div
        ref={contentRef}
        className={cn('overflow-hidden transition-all duration-200 ease-in-out')}
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className='flex flex-wrap gap-2'>
          {Object.keys(queryCriteria.tags).map((key) => {
            const typedKey = key as keyof (typeof queryCriteria)['tags']
            const value = queryCriteria.tags[typedKey]
            const isSelected = selectedTag === value

            return (
              <div
                key={key}
                className={cn(
                  'flex justify-center items-center max-h-8 p-2 rounded-lg cursor-pointer',
                  isSelected ? 'bg-white text-black' : 'bg-grey-500 text-grey-100'
                )}
                onClick={() => handleTagClick(typedKey, value)}
              >
                <Text as='p' styleVariant='body-xsmall'>
                  {key}
                </Text>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const DiscoverQueryByGenres: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const contentRef = React.useRef<HTMLDivElement>(null)
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
    <div className={cn('border-t border-grey-300', isExpanded && 'border-b-0 pb-4')}>
      <button
        className='flex justify-between items-center w-full text-left py-4 focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <Text as='p' styleVariant='body-large'>
          Genres
        </Text>
        <ChevronDown size={19} />
      </button>
      <div
        ref={contentRef}
        className={cn('overflow-hidden transition-all duration-200 ease-in-out')}
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className='flex flex-wrap gap-2'>
          {genres?.map((tag, index) => (
            <div
              className={cn(
                'flex justify-center items-center max-h-8 p-2 rounded-lg cursor-pointer',
                selectedTags?.includes(tag.slug) ? 'bg-white text-black' : 'bg-grey-500 text-grey-100'
              )}
              key={`${tag.slug}-${index}`}
              onClick={() => handleTagClick(tag.slug)}
            >
              <Text as='p' styleVariant='body-xsmall'>
                {tag.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
