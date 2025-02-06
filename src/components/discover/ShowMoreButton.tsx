'use client'

import { Button, Text } from '../ui'
import { pluralizeString } from '@/utils/helpers'
import { ChevronDownIcon } from '@/components/icons/theme/ChevronDownIcon'
import { LoaderIcon } from '../icons/theme/LoaderIcon'

type Props = {
  isFetching: boolean
  hasNextPage: boolean
  onClick: () => void
  itemsFound: number
}

export const ShowMoreButton: React.FC<Props> = ({ isFetching, hasNextPage, onClick, itemsFound }) => {
  if (!hasNextPage) {
    return (
      <Text as='span' styleVariant='body-normal' className='pt-4'>
        {itemsFound === 0 ? 'No items found' : `${itemsFound} ${pluralizeString('item', itemsFound)} found`}
      </Text>
    )
  }

  return (
    <Button onClick={onClick} variant='outline' Icon={isFetching ? LoaderIcon : ChevronDownIcon} iconPosition='right'>
      Show more
    </Button>
  )
}
