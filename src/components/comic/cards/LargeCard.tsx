import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import { ContentWithGradientImageBg } from '../../shared/ContentWithGradientImageBg'
import { cn } from '@/lib/utils'
import { Text } from '../../ui/Text'
import { RoutePath } from '@/enums/routePath'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  index: number
}

export const LargeComicCard: React.FC<Props> = ({ className, comic, index }) => (
  <Link
    href={RoutePath.Comic(comic.slug)}
    prefetch={false}
    className='flex flex-col justify-end max-md:min-w-[242px] max-w-[357px] h-full w-full p-2 border border-grey-300 rounded-2xl size-full'
  >
    <ContentWithGradientImageBg
      image={comic.cover}
      className={cn(
        'h-[229px] md:h-[279px] hover:brightness-110 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]',
        className
      )}
      gradientDirectionClassName='bg-gradient-to-t'
    >
      <div className='flex gap-4 items-center absolute bottom-0 p-2 sm:p-6'>
        <span className='text-white text-opacity-40 text-[48px] font-bold leading-[57.6px]'>{index + 1}</span>
        <div className='flex flex-col'>
          <Text
            as='span'
            styleVariant='body-normal'
            fontWeight='bold'
            className='line-clamp-1 overflow-ellipsis max-md:text-sm'
            title={comic.title}
          >
            {comic.title}
          </Text>
          <Text
            as='span'
            styleVariant='body-small'
            fontWeight='medium'
            className='line-clamp-1 overflow-ellipsis text-grey-100 max-md:text-xs'
            title={comic.creator?.handle ?? 'creator name'}
          >
            by&nbsp;{comic.creator?.handle}
          </Text>
        </div>
      </div>
    </ContentWithGradientImageBg>
  </Link>
)
