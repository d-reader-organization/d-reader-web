'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { favouritiseComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import { Text } from '@/components/ui'
import { favouritiseComicIssue } from '@/app/lib/api/comicIssue/mutations'

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
  const [, startTransition] = useTransition()
  const [state, setNewState] = useOptimistic(
    {
      favouritesCount,
      isFavourite,
    },
    (state) => {
      return {
        favouritesCount: state.isFavourite ? state.favouritesCount - 1 : state.favouritesCount + 1,
        isFavourite: !state.isFavourite,
      }
    }
  )

  const handleSubmit = async () => {
    startTransition(async () => {
      setNewState(null)
      if (comicSlug) {
        await favouritiseComic(comicSlug)
      } else if (comicIssueId) {
        await favouritiseComicIssue(comicIssueId)
      }
      refresh()
    })
  }

  return (
    <RequireAuthWrapperButton
      icon={Heart}
      variant='outline'
      onClick={handleSubmit}
      className={cn(
        'rounded-xl min-w-[80px] w-[80px]',
        state.isFavourite && 'bg-red-500 bg-opacity-40 text-red-500 border-0',
        className
      )}
      iconClassname={cn(state.isFavourite && 'fill-red-500')}
    >
      <Text as='span' styleVariant='body-small' fontWeight='bold' className={cn('max-sm:text-xs', state.isFavourite && 'text-white')}>
        {state.favouritesCount}
      </Text>
    </RequireAuthWrapperButton>
  )
}
