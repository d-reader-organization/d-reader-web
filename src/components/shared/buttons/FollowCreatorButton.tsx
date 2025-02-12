'use client'

import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'
import { UserPlusIcon } from '@/components/icons/theme/UserPlusIcon'
import { useOptimistic } from 'react'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  isFollowingDefault?: boolean
  creatorId: number
}

export const FollowCreatorButton: React.FC<Props> = ({ isFollowingDefault = false, creatorId, className }) => {
  const { refresh } = useRouter()
  const [isFollowing, setIsFollowing] = useOptimistic(isFollowingDefault, (current) => !current)

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsFollowing(null)
    e.preventDefault()
    await followCreator(creatorId)
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
