'use client'

import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { UserPlusIcon } from '@/components/icons/theme/UserPlusIcon'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  isFollowing?: boolean
  creatorSlug: string
}

export const FollowCreatorButton: React.FC<Props> = ({ isFollowing = false, creatorSlug, className }) => {
  const { refresh } = useRouter()

  // TODO: does this button even work as intended?
  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await followCreator(creatorSlug)
    refresh()
  }

  return (
    <RequireAuthWrapperButton
      className={cn('min-w-[126px]', className)}
      variant={isFollowing ? 'outline' : 'white'}
      onClick={handleFollow}
      Icon={UserPlusIcon}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </RequireAuthWrapperButton>
  )
}
