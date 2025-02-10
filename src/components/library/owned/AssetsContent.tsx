'use client'

import { OwnedCollectibleComicDialog } from '@/components/digital-asset/OwnedCollectibleComicDialog'
import { ArrowLeftIcon } from '@/components/icons/theme/ArrowLeftIcon'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Text } from '@/components/ui/Text'
import { TextWithOverflow } from '@/components/ui/TextWithOverflow'
import { RoutePath } from '@/enums/routePath'
import { OwnedCollectibleComic } from '@/models/asset'
import { ComicIssue } from '@/models/comicIssue'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  comicIssue: ComicIssue
  ownedCollectibles: OwnedCollectibleComic[]
}

export const OwnedComicCollectiblesContent: React.FC<Props> = ({ comicIssue, ownedCollectibles }) => {
  const { back } = useRouter()

  return (
    <div className='flex flex-col items-start'>
      <button className='flex items-center gap-2 w-fit py-4' onClick={back}>
        <ArrowLeftIcon className='size-8' />
        <Text as='h4' styleVariant='secondary-heading'>
          {ownedCollectibles.at(0)?.collectibles.at(0)?.comicTitle}
        </Text>
      </button>

      {!ownedCollectibles.length ? (
        <div className='flex flex-col justify-center items-center h-full self-center my-20'>
          <Text as='h5' styleVariant='secondary-heading'>
            You don&apos;t own any assets from these series
          </Text>
        </div>
      ) : (
        ownedCollectibles.map((ownedIssue) => {
          return (
            <div
              key={ownedIssue.title}
              className='flex w-full justify-between gap-8 md:gap-12 py-10 border-t border-t-grey-300 border-b border-b-grey-300'
            >
              <div className='flex flex-col gap-2 max-w-[240px] w-full'>
                <Text as='h5' styleVariant='secondary-heading'>
                  EP {ownedIssue.number}
                </Text>
                <TextWithOverflow
                  as='p'
                  styleVariant='body-normal'
                  fontWeight='medium'
                  className='text-grey-100 line-clamp-1 text-ellipsis'
                  title={comicIssue.title}
                >
                  {ownedIssue.title}
                </TextWithOverflow>
                <ButtonLink
                  className='min-w-fit w-fit'
                  variant='secondary'
                  subVariant={1}
                  href={RoutePath.ReadComicIssue(ownedIssue.id)}
                  prefetch={false}
                >
                  Read EP {ownedIssue.number}
                </ButtonLink>
              </div>
              <div className='flex flex-wrap gap-6 md:gap-10 w-full'>
                {ownedIssue.collectibles.map((collectibleComic) => (
                  <OwnedCollectibleComicDialog
                    key={collectibleComic.address}
                    collectibleComic={collectibleComic}
                    comicIssue={comicIssue}
                  />
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
