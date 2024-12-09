'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchCreators } from '@/api/creator/queries'
import { DefaultCreatorCard } from '../creator/cards/DefaultCard'
import { ShowMoreButton } from './ShowMoreButton'
import { Loader } from '../shared/Loader'

export const CreatorGrid: React.FC = () => {
  const creatorParams = useDiscoverQueryStore((state) => state.creatorParams)
  const { flatData: creators, fetchNextPage, hasNextPage, isFetching, isFetched } = useFetchCreators(creatorParams)

  if (isFetching && !isFetched) {
    return <Loader className='mx-auto pt-6 sm:pt-8' />
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-1 sm:pt-2'>
        {creators.map((creator) => (
          <DefaultCreatorCard key={creator.slug} creator={creator} />
        ))}
      </div>
      <div className='flex flex-col items-center pt-2 sm:pt-3'>
        <ShowMoreButton
          onClick={fetchNextPage}
          isFetching={isFetching}
          itemsFound={creators.length}
          hasNextPage={hasNextPage}
        />
      </div>
    </>
  )
}
