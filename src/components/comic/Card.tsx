import { Comic } from '@/models/comic'
import clsx from 'clsx'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import React from 'react'
import Image from 'next/image'
import { blurDataUrl } from '@/constants/general'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  comic: Comic
  priority?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'
}

export const ComicCard: React.FC<Props> = ({ comic, className, priority, fetchPriority }) => {
  const nextPage = RoutePath.Comic(comic.slug)

  return (
    <div
      className={clsx(
        'relative border-[3.2px] rounded-2xl border-solid border-grey-500 aspect-comic-cover-aspect-ratio w-full cursor-pointer pointer transition ease-in transform duration-200 hover:-translate-y-2 group',
        className
      )}
    >
      <Link className='absolute top-0 left-0 w-full h-full' href={nextPage}>
        <Image
          sizes='500px'
          className='-z-[1] object-cover rounded-2xl opacity-1 brightness-[0.7] bg-grey-500 aspect-comic-cover-aspect-ratio group-hover:brightness-100'
          src={comic.cover}
          alt={`cover-${comic.title}`}
          fill
          priority={priority}
          fetchPriority={fetchPriority}
          placeholder='blur'
          blurDataURL={blurDataUrl}
        />
        <Image
          alt={`logo-${comic.title}`}
          sizes='230px'
          src={comic.logo}
          className='max-w-[180px] max-h-[80%] object-cover p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          width={180}
          height={180}
          priority={priority}
          placeholder='blur'
          blurDataURL={blurDataUrl}
        />
      </Link>
    </div>
  )
}
