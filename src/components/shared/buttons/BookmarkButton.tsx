'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { bookmarkComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import BookmarkIcon from 'public/assets/vector-icons/bookmark.svg'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  comicSlug: string
  isBookmarked?: boolean
}

export const BookmarkButton: React.FC<Props> = ({ comicSlug, isBookmarked, className }) => {
  const { refresh } = useRouter()
  const [, startTransition] = useTransition()
  const [isBookmarkedState, setIsBookmarkedState] = useOptimistic(isBookmarked, (state) => {
    return !state
  })

  const handleSubmit = async () => {
    startTransition(async () => {
      setIsBookmarkedState(null)
      await bookmarkComic(comicSlug)
      refresh()
    })
  }

  return (
    <RequireAuthWrapperButton
      variant='outline'
      onClick={handleSubmit}
      className={cn(
        'rounded-xl min-w-[106px] w-[106px] sm:px-2 gap-1',
        isBookmarkedState && 'bg-green-accent bg-opacity-40 text-green-accent border-0',
        className
      )}
    >
      <BookmarkIcon className='w-5 sm:w-6' />
      <Text as='span' styleVariant='body-normal' className={cn('max-sm:text-xs', isBookmarkedState && 'text-white')}>
        Favorite
      </Text>
    </RequireAuthWrapperButton>
  )
}
