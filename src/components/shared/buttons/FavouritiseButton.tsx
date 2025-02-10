'use client'

import { useRouter } from 'next/navigation'
import { favouritiseComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import { HeartIcon } from '@/components/icons/theme/HeartIcon'
import { favouritiseComicIssue } from '@/app/lib/api/comicIssue/mutations'
import { useOptimistic } from 'react'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  comicSlug?: string
  comicIssueId?: number
  isFavourite?: boolean
  favouritesCount?: number
}

export const FavouritiseButton: React.FC<Props> = ({
  comicSlug,
  comicIssueId,
  isFavourite = false,
  favouritesCount = 0,
  className,
}) => {
  const { refresh } = useRouter()
  const [{ count, isFavouritised }, updateLocalState] = useOptimistic(
    { isFavouritised: isFavourite, count: favouritesCount },
    (current) => {
      return {
        count: current.isFavouritised ? current.count - 1 : current.count + 1,
        isFavouritised: !current.isFavouritised,
      }
    }
  )

  const handleSubmit = async () => {
    updateLocalState(null)
    if (comicSlug) {
      await favouritiseComic(comicSlug)
    } else if (comicIssueId) {
      await favouritiseComicIssue(comicIssueId)
    }
    refresh()
  }

  return (
    <RequireAuthWrapperButton
      Icon={HeartIcon}
      variant='outline'
      onClick={handleSubmit}
      className={cn(
        'rounded-xl min-w-[80px] w-[80px]',
        isFavouritised && 'bg-red-500 bg-opacity-40 text-red-500 border-0',
        className
      )}
      solid={isFavouritised}
    >
      <Text as='span' styleVariant='body-normal' className={cn('max-sm:text-xs', isFavouritised && 'text-white')}>
        {count}
      </Text>
    </RequireAuthWrapperButton>
  )
}
