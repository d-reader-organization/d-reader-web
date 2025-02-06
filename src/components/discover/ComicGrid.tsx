'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchComics } from '@/api/comic/queries'
import { DefaultComicCard } from '../comic/cards/DefaultCard'
import { ShowMoreButton } from './ShowMoreButton'
import { LoaderIcon } from '../icons/theme/LoaderIcon'

export const ComicGrid: React.FC = () => {
  const comicParams = useDiscoverQueryStore((state) => state.comicParams)
  const { flatData: comics, fetchNextPage, hasNextPage, isFetching, isFetched } = useFetchComics(comicParams)

  if (isFetching && !isFetched) {
    return <LoaderIcon className='mx-auto pt-6 sm:pt-8' />
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6 pt-1 sm:pt-2'>
        {comics.map((comic) => (
          <DefaultComicCard key={comic.slug} comic={comic} className='max-md:max-h-fit' />
        ))}
      </div>
      <div className='flex flex-col items-center pt-2 sm:pt-3'>
        <ShowMoreButton
          onClick={fetchNextPage}
          isFetching={isFetching}
          itemsFound={comics.length}
          hasNextPage={hasNextPage}
        />
      </div>
    </>
  )
}
