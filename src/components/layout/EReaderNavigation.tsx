'use client'

import { ComicIssue } from '@/models/comicIssue'
import clsx from 'clsx'
import React from 'react'
import ArrowRightIcon from 'public/assets/vector-icons/arrow-right.svg'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { useRouter } from 'next/navigation'
import { Button } from '../ui'
import { cn } from '@/lib/utils'
import { RateButton } from '../shared/buttons/RateButton'
import { FavouritiseButton } from '../shared/buttons/FavouritiseButton'

type Props = {
  comicIssue: ComicIssue
  hideNavigation?: boolean
}

export const EReaderNavigation: React.FC<Props> = ({ comicIssue, hideNavigation = false }) => {
  const navigationLinkStyle = 'hover:text-yellow-500 hover:[&>*]:text-yellow-500 text-lg'
  const arrowRightReversedStyle = 'h-[18px] text-text-color rotate-180'
  const { back } = useRouter()
  const commands = (
    <div className='justify-end gap-2 flex max-md:px-2'>
      <RateButton
        comicIssueId={comicIssue.id}
        averageRating={comicIssue.stats?.averageRating}
        rating={comicIssue.myStats?.rating}
      />
      <FavouritiseButton
        comicIssueId={comicIssue.id}
        isFavourite={comicIssue.myStats?.isFavourite}
        favouritesCount={comicIssue.stats?.favouritesCount}
      />
    </div>
  )

  return (
    <div
      className={clsx(
        'bg-grey-600 border-none sticky transition-[colors_300,opacity_500] p-0',
        hideNavigation && 'opacity-0'
      )}
    >
      <div className='w-full mx-auto h-[72px] max-w-screen-xl flex items-center'>
        <div className='flex items-center justify-between max-w-screen-md mx-auto w-full'>
          <Button variant='ghost' onClick={() => back()} className={cn('w-fit', navigationLinkStyle)}>
            <ArrowRightIcon className={arrowRightReversedStyle} />
          </Button>
          <Link
            href={RoutePath.ComicIssue(comicIssue.id)}
            className={clsx('flex gap-1', navigationLinkStyle)}
            prefetch={false}
          >
            <div className='hidden sm:block'>
              <strong>EP {comicIssue.number}</strong>&nbsp;&nbsp;
            </div>
            <span className='text-grey-100'>{comicIssue.title}</span>
          </Link>
          {commands}
        </div>
      </div>
    </div>
  )
}
