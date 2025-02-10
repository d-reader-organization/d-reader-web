'use client'

import { useRouter } from 'next/navigation'
import { bookmarkComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { BookmarkIcon } from '@/components/icons/theme/BookmarkIcon'
import { useOptimistic } from 'react'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  comicSlug: string
  isBookmarkedDefault?: boolean
}

export const BookmarkButton: React.FC<Props> = ({ comicSlug, isBookmarkedDefault, className }) => {
  const { refresh } = useRouter()
  const [isBookmarked, setIsBookmarked] = useOptimistic(isBookmarkedDefault, (current) => !current)

  const handleSubmit = async () => {
    setIsBookmarked(null)
    await bookmarkComic(comicSlug)
    refresh()
  }
  return (
    <RequireAuthWrapperButton
      variant='outline'
      onClick={handleSubmit}
      Icon={BookmarkIcon}
      solid={isBookmarked}
      className={cn(
        'rounded-xl min-w-[106px] w-[106px] sm:px-2 gap-1',
        isBookmarked && 'bg-green-accent bg-opacity-40 text-green-accent border-0',
        className
      )}
    >
      Favorite
    </RequireAuthWrapperButton>
  )
}
