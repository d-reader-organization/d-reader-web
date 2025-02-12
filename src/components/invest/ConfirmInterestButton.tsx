'use client'

import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton, RequireAuthWrapperButtonProps } from '../shared/buttons/RequireAuthWrapperButton'

type Props = {
  slug: string
  isUserInterested?: boolean
  className?: RequireAuthWrapperButtonProps['className']
}

export const ConfirmInterestButton: React.FC<Props> = ({ slug, className, isUserInterested }) => {
  return (
    <RequireAuthWrapperButton
      onClick={() => {
        // TODO: express interest (special handling for BONK?)
        console.log(slug)
      }}
      className={cn(
        isUserInterested
          ? 'text-white bg-grey-500 border-2 border-white pointer-events-none'
          : 'text-grey-600 bg-green-genesis border-green-300 hover:brightness-100',
        className
      )}
    >
      {isUserInterested ? 'Interested!' : 'Express interest'}
    </RequireAuthWrapperButton>
  )
}
