import { ANON_BUN_IMAGE_LINK } from '@/constants/general'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { User } from '@/models/user'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  user: User
} & React.HTMLAttributes<HTMLDivElement>

export const ProfileWidget: React.FC<Props> = ({ className, user }) => (
  <div className={cn('flex gap-3 items-center max-md:mt-6', className)}>
    <Image
      alt='avatar'
      width={48}
      height={48}
      src={user.avatar || ANON_BUN_IMAGE_LINK}
      className='size-12 object-cover rounded-full border border-black'
    />
    <Link href={RoutePath.Profile} className='flex flex-col justify-center max-h-12' prefetch={false}>
      <span className='text-lg font-bold leading-[25.2px] text-grey-100'>{user.displayName}</span>
      <span className='text-grey-200 text-sm font-medium leading-[19.6px]'>view profile</span>
    </Link>
  </div>
)
