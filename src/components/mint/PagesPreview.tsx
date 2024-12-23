import { RoutePath } from '@/enums/routePath'
import { ComicPage } from '@/models/comic/comicPage'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  comicIssueId: number
  pages: ComicPage[]
}

export const PagesPreview: React.FC<Props> = ({ comicIssueId, pages }) => {
  return (
    <Link
      className='relative w-fit max-md:self-center max-h-fit'
      href={RoutePath.ReadComicIssue(comicIssueId)}
      prefetch={false}
    >
      <div className='grid grid-cols-3 gap-6 self-end'>
        {pages.slice(0, 6).map((page, index) => (
          <Image
            alt={`page-${index}`}
            src={page.image}
            key={page.image}
            width='0'
            height='0'
            sizes='107px'
            className='w-full max-h-40 object-cover rounded-lg opacity-50'
          />
        ))}
      </div>
      <div className='absolute top-0 size-full flex justify-center items-center'>
        <div className='size-32 flex flex-col justify-center items-center gap-1 rounded-full bg-black bg-opacity-15 backdrop-blur-[10px]'>
          <EyeIcon size={24} />
          <p className='text-base font-medium leading-[22.4px]'>Preview</p>
        </div>
      </div>
    </Link>
  )
}
