import React from 'react'
import { Creator } from '@/models/creator'
import { AvatarImage } from '../shared/AvatarImage'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  creator: Pick<Creator, 'id' | 'handle' | 'isVerified' | 'avatar'> | undefined
}

export const CreatorInfoLink: React.FC<Props> = ({ className, creator }) =>
  !!creator ? (
    <Link href={RoutePath.Creator(creator.handle)} className={cn('flex items-center gap-3 max-h-[42px]', className)}>
      <AvatarImage size='medium' src={creator.avatar} />
      <div className='flex flex-col gap-1 justify-center items-start max-w-[400px]'>
        <span className='text-xs font-medium leading-normal text-grey-200'>Author</span>
        <span className='text-base font-bold leading-[22.4px] line-clamp-1'>{creator.handle}</span>
      </div>
    </Link>
  ) : null
