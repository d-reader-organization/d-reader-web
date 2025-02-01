'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/Input'
import { LoaderCircle, Search } from 'lucide-react'
import { SearchResultComic } from '@/models/comic'
import { SearchResultCreator } from '@/models/creator'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { pluralizeString } from '@/utils/helpers'
import { RoutePath } from '@/enums/routePath'
import Link from 'next/link'
import { useSearchComics } from '@/api/comic/queries/useSearchComics'
import { useSearchCreators } from '@/api/creator/queries/useSearchCreators'
import { CloseIcon } from '@/components/icons/theme/CloseIcon'

type Props = React.InputHTMLAttributes<HTMLInputElement>

type SearchResultModel = {
  id: string
  image: string
  title: string
  episodeCount: number
  href: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [comicsResults, setComicsResults] = useState<SearchResultModel[]>([])
  const [creatorsResults, setCreatorsResults] = useState<SearchResultModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const { refetch: fetchComics } = useSearchComics({
    params: { skip: 0, take: 3, search: searchTerm.toLowerCase() },
  })
  const { refetch: fetchCreators } = useSearchCreators({
    params: { skip: 0, take: 3, search: searchTerm.toLowerCase() },
  })

  const searchAPI = async (): Promise<{
    comics: SearchResultModel[]
    creators: SearchResultModel[]
  }> => {
    const [comicsResult, creatorsResult] = await Promise.all([fetchComics(), fetchCreators()])
    const comics = comicsResult.data?.pages.at(0) ?? []
    const creators = creatorsResult.data?.pages.at(0) ?? []
    return {
      comics: comics.map((comic: SearchResultComic) => ({
        id: comic.slug,
        image: comic.cover,
        title: comic.title,
        episodeCount: comic.issuesCount,
        href: RoutePath.Comic(comic.slug),
      })),
      creators: creators.map((creator: SearchResultCreator) => ({
        id: creator.slug,
        image: creator.avatar,
        title: creator.name,
        episodeCount: creator.issuesCount,
        href: RoutePath.Creator(creator.slug),
      })),
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const debouncedSearch = useDebouncedCallback(async (value) => {
    if (!value) {
      setComicsResults([])
      setCreatorsResults([])
      setShowResults(false)
      return
    }
    setIsLoading(true)
    const { comics, creators } = await searchAPI()
    setComicsResults(comics)
    setCreatorsResults(creators)
    setShowResults(true)
    setIsLoading(false)
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const clearInput = useCallback(() => {
    setShowResults(false)
    setSearchTerm('')
  }, [])

  return (
    <div className={cn('relative z-10', className)} ref={searchRef}>
      {searchTerm ? (
        <button className='absolute top-3 left-3' onClick={clearInput}>
          <CloseIcon className='size-[18px] text-white' />
        </button>
      ) : (
        <Search className='size-[18px] absolute top-3 left-3 text-grey-200' />
      )}
      <Input
        placeholder='Search comics or creators'
        value={searchTerm}
        className='pl-10 pr-10 max-md:w-full'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <LoaderCircle
        className={cn('size-[18px] animate-spin absolute top-3 right-3 text-grey-200', isLoading ? '' : 'hidden')}
      />
      {showResults ? (
        <div className='max-w-80 md:max-w-[400px] flex flex-col gap-6 p-4 rounded-xl bg-grey-500 absolute top-14 md:top-16 w-full'>
          {creatorsResults.length || comicsResults.length ? (
            <>
              {creatorsResults.length ? <SearchResultsContainer results={creatorsResults} title='CREATORS' /> : null}
              {comicsResults.length ? <SearchResultsContainer results={comicsResults} title='COMIC SERIES' /> : null}
            </>
          ) : (
            <span className='text-base font-medium text-center'>No results found</span>
          )}
        </div>
      ) : null}
    </div>
  )
}

type SearchResultsContainerProps = {
  results: SearchResultModel[]
  title: string
}

const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({ results, title }) => (
  <div className='flex flex-col gap-2'>
    <span className='text-xs font-bold text-grey-200 leading-normal'>{title}</span>
    <div className='flex flex-col gap-2'>
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  </div>
)

type SearchResultProps = {
  result: SearchResultModel
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => (
  <Link href={result.href} className='flex items-center justify-between hover:brightness-125' prefetch={false}>
    <div className='flex items-center gap-2 w-4/5'>
      <Image
        width={24}
        height={24}
        className='object-cover rounded-lg bg-grey-700 size-6'
        src={result.image}
        alt='image'
      />
      <span className='text-sm text-white font-bold leading-[19.6px] overflow-ellipsis line-clamp-1'>
        {result.title}
      </span>
    </div>
    <span className='text-grey-100 text-sm font-medium leading-[19.6px]'>
      {result.episodeCount} {pluralizeString('EP', result.episodeCount)}
    </span>
  </Link>
)
