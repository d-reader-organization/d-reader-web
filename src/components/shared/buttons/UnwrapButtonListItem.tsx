import { Button } from '@/components/ui/Button'
import React from 'react'
import { LoaderIcon } from '../../icons/theme/LoaderIcon'

type Props = { isLoading: boolean; onClick: () => void }

export const UnwrapButtonListItem: React.FC<Props> = ({ isLoading, onClick }) => {
  return (
    <Button
      className='border bg-transparent cursor-pointer w-20 h-12 rounded-[4px] border-green-500 text-green-500'
      onClick={onClick}
      Icon={isLoading ? LoaderIcon : undefined}
    >
      Open
    </Button>
  )
}
