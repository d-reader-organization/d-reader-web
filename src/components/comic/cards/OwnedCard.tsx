'use client'

import { Comic } from '@/models/comic'
import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { CopiesCount } from '@/components/shared/CopiesCount'
import { CardBorderWrapper } from '@/components/shared/CardBorderWrapper'
import { MoreHorizontalIcon } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
}

export const OwnedComicCard: React.FC<Props> = ({ comic }) => {
  return (
    <CardBorderWrapper className='flex flex-col  size-fit h-[262px] w-[156px] sm:h-[361px] sm:w-[226px]'>
      <div className='relative size-full max-h-[233px]'>
        <Image
          alt=''
          src={comic.cover}
          width={1000}
          height={900}
          className='object-cover rounded-xl h-[155px] sm:h-[233px] w-full opacity-50'
        />
        <Image
          alt=''
          src={comic.logo}
          width={120}
          height={120}
          className='object-cover h-120 w-auto absolute m-auto top-0 bottom-0 left-0 right-0 pointer-events-none'
        />
        <CopiesCount count={comic.myStats?.collectiblesCount ?? 0} className='absolute top-2 right-2' />
      </div>
      <div className='flex flex-col p-2'>
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
          by&nbsp;{comic.creator?.handle}
        </Text>
      </div>
      <div className='flex gap-2 sm:p-2'>
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
          Icon={MoreHorizontalIcon}
        />
      </div>
    </CardBorderWrapper>
  )
}
