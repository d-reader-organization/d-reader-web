'use client'

import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import useToggle from '@/hooks/useToggle'
import { StarRatingDialog } from '@/components/shared/dialogs/StarRatingDialog'
import { Nullable } from '@/models/common'
import { Star } from 'lucide-react'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  comicSlug?: string
  comicIssueId?: number
  rating?: Nullable<number>
  averageRating?: Nullable<number>
}

export const RateButton: React.FC<Props> = ({ comicSlug, comicIssueId, rating, averageRating, className }) => {
  const [isOpenStarRatingDialog, toggleStarRating] = useToggle()

  return (
    <>
      <RequireAuthWrapperButton
        icon={Star}
        size='md'
        onClick={() => toggleStarRating()}
        variant='outline'
        className={cn(
          'rounded-xl min-w-[80px] w-[80px]',
          rating && 'bg-yellow-500 bg-opacity-40 text-yellow-500 border-0',
          className
        )}
        iconClassname={cn(rating && 'fill-yellow-500')}
      >
        <Text as='span' styleVariant='body-normal' className={cn('max-sm:text-xs', rating && 'text-white')}>
          {averageRating}
        </Text>
      </RequireAuthWrapperButton>
      <StarRatingDialog
        comicSlug={comicSlug}
        comicIssueId={comicIssueId}
        open={isOpenStarRatingDialog}
        toggleDialog={toggleStarRating}
      />
    </>
  )
}
