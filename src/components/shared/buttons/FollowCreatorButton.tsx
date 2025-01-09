'use client'

import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { cn } from '@/lib/utils'
import { RequireAuthWrapperButton } from './RequireAuthWrapperButton'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  isFollowing?: boolean
  creatorSlug: string
}

export const FollowCreatorButton: React.FC<Props> = ({ isFollowing = false, creatorSlug, className }) => {
  const { refresh } = useRouter()

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
    >
      <UserPlusIcon className='w-[18px]' />
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='max-sm:text-xs'>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Text>
    </RequireAuthWrapperButton>
  )
}
