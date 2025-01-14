'use client'

import { Comic } from '@/models/comic'
import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { CopiesCount } from '@/components/shared/CopiesCount'
import { MoreHorizontalIcon } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { COMIC_COVER_SIZE } from '@/constants/imageSizes'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
}

export const OwnedComicCard: React.FC<Props> = ({ comic, className }) => {
  return (
    <Link
      href={RoutePath.Comic(comic.slug)}
      prefetch={false}
      className={cn(
        'flex flex-col gap-2 relative max-md:min-w-[156px] w-full h-full max-md:max-h-[222px] hover:brightness-110 p-2 border border-grey-300 rounded-2xl',
        className
      )}
    >
      <Image
        src={comic.cover}
        priority
        alt={`Comic cover ${comic.title}`}
        className='rounded-2xl h-auto aspect-comic-cover object-cover opacity-50'
        {...COMIC_COVER_SIZE}
      />
      <div className='absolute w-[70%] m-auto -top-16 bottom-14 left-0 right-0 max-w-[180px] max-h-[180px]'>
        <Image
          priority
          alt=''
          src={comic.logo}
          fill
          className='object-contain pointer-events-none'
          sizes='(max-width: 600px) 100%, 120px'
        />
      </div>
      <CopiesCount count={comic.myStats?.collectiblesCount ?? 0} className='absolute top-3 right-3' />
      <div className='flex flex-col p-2 gap-2'>
        <Text
          as='span'
          styleVariant='body-normal'
          fontWeight='bold'
          className='line-clamp-1 overflow-ellipsis max-md:text-sm'
        >
          {comic.title}
        </Text>
        <Text
          as='span'
          styleVariant='body-small'
          fontWeight='medium'
          className='line-clamp-1 overflow-ellipsis text-grey-100 max-md:text-xs'
        >
          by&nbsp;{comic.creator?.name}
        </Text>
        <div className='flex gap-2 pt-1'>
          <ButtonLink
            className='w-full'
            variant='secondary'
            subVariant={1}
            href={RoutePath.ReadComic(comic.slug)}
            prefetch={false}
          >
            Read
          </ButtonLink>
          <ButtonLink
            variant='outline'
            subVariant={1}
            href={RoutePath.OwnedAssets(comic.slug)}
            prefetch={false}
            icon={MoreHorizontalIcon}
            iconOnly
          />
        </div>
      </div>
    </Link>
  )
}
