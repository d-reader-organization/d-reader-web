'use client'

import { ComicIssue } from '@/models/comicIssue'
import clsx from 'clsx'
import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { RateButton } from '@/components/shared/buttons/RateButton'
import { FavouritiseButton } from '@/components/shared/buttons/FavouritiseButton'
import { ArrowLeftIcon } from '@/components/icons/theme/ArrowLeftIcon'
import { ButtonLink } from '../ui/ButtonLink'

type Props = {
  comicIssue: ComicIssue
  hideNavigation?: boolean
}

export const EReaderNavigation: React.FC<Props> = ({ comicIssue, hideNavigation = false }) => {
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
          <Button Icon={ArrowLeftIcon} variant='ghost' onClick={() => back()} size='lg' />
          <ButtonLink variant='ghost' size='lg' href={RoutePath.ComicIssue(comicIssue.id)} prefetch={false}>
            <div className='hidden sm:block'>
              <strong className='mr-2'>EP {comicIssue.number}</strong>
            </div>
            <span className='text-grey-100'>{comicIssue.title}</span>
          </ButtonLink>
          {commands}
        </div>
      </div>
    </div>
  )
}
