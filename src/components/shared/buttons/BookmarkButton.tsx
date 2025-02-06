'use client'

import { useRouter } from 'next/navigation'
import { bookmarkComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { BookmarkIcon } from '@/components/icons/theme/BookmarkIcon'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  comicSlug: string
  isBookmarked?: boolean
}

export const BookmarkButton: React.FC<Props> = ({ comicSlug, isBookmarked, className }) => {
  const { refresh } = useRouter()

  const handleSubmit = async () => {
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
