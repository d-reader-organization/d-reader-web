'use client'

import { OwnedCollectibleComicPreview } from '@/components/digital-asset/OwnedCollectibleComicPreview'
import { Button } from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Text } from '@/components/ui/Text'
import { RoutePath } from '@/enums/routePath'
import { OwnedCollectibleComic } from '@/models/asset'
import { ComicIssue } from '@/models/comicIssue'
import { ArrowLeft } from 'lucide-react'
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
      <Button className='flex items-center gap-3 w-fit px-0 sm:px-0 py-4 sm:py-8' variant='ghost' onClick={back}>
        <ArrowLeft className='size-8' />
        <Text as='h3' styleVariant='secondary-heading'>
          {ownedCollectibles.at(0)?.collectibles.at(0)?.comicTitle}
        </Text>
      </Button>

      {!ownedCollectibles.length ? (
        <div className='flex flex-col justify-center items-center h-full self-center'>
          <Text as='h5' styleVariant='primary-heading'>
            You don&apos;t own any assets from these series
          </Text>
        </div>
      ) : (
        ownedCollectibles.map((ownedIssue) => {
          return (
            <div
              key={ownedIssue.title}
              className='flex w-full justify-between gap-8 md:gap-16 py-10 border-t border-t-grey-300 border-b border-b-grey-300'
            >
              <div className='flex flex-col gap-2 max-w-[180px] w-full'>
                <Text as='h5' styleVariant='secondary-heading'>
                  EP {ownedIssue.number}
                </Text>
                <Text
                  as='p'
                  styleVariant='body-normal'
                  fontWeight='medium'
                  className='text-grey-100 line-clamp-1 text-ellipsis'
                >
                  {ownedIssue.title}
                </Text>
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
                  <OwnedCollectibleComicPreview
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
