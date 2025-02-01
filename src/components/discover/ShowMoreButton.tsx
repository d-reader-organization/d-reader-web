'use client'

import { Text } from '../ui'
import { pluralizeString } from '@/utils/helpers'
import { LoaderCircle } from 'lucide-react'
import { ChevronDown } from '@/components/icons/theme/ChevronDown'

type Props = {
  isFetching: boolean
  hasNextPage: boolean
  onClick: () => void
  itemsFound: number
}

export const ShowMoreButton: React.FC<Props> = ({ isFetching, hasNextPage, onClick, itemsFound }) => {
  if (!hasNextPage) {
    return (
      <Text as='span' styleVariant='body-normal' className='max-sm:text-sm pt-3 sm:pt-4'>
        {itemsFound === 0 ? 'No items found' : `${itemsFound} ${pluralizeString('item', itemsFound)} found`}
      </Text>
    )
  }

  return (
    <>
      {isFetching ? (
        <LoaderCircle className='size-6 animate-spin sm:size-8' />
      ) : (
        <button
          onClick={onClick}
          className='flex w-36 sm:w-40 justify-center items-center gap-2 px-4 py-3 max-h-12 bg-transparent text-grey-100 rounded-xl hover:brightness-110 border border-grey-300'
        >
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='max-md:text-sm'>
            Show more
          </Text>
          <ChevronDown className='w-4 h-4 md:w-6 md:h-6' />
        </button>
      )}
    </>
  )
}
