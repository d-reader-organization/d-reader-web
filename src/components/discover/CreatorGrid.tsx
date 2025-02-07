'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchCreators } from '@/api/creator/queries/useFetchCreators'
import { DefaultCreatorCard } from '../creator/cards/DefaultCard'
import { ShowMoreButton } from './ShowMoreButton'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { useAuthStore } from '@/providers/AuthStoreProvider'

export const CreatorGrid: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const creatorParams = useDiscoverQueryStore((state) => state.creatorParams)
  const {
    flatData: creators,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
  } = useFetchCreators({ params: creatorParams, accessToken })

  if (isFetching && !isFetched) {
    return <LoaderIcon className='mx-auto pt-6 sm:pt-8 size-6' />
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-1 sm:pt-2'>
        {creators.map((creator) => (
          <DefaultCreatorCard key={creator.handle} creator={creator} />
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
