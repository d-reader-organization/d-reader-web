'use client'

import React from 'react'
import Image from 'next/image'
import { Project } from '@/models/project'
import { YoutubeVideoDialog } from './dialogs/YoutubeVideoDialog'
import { useToggle } from '@/hooks'
import { PlayIcon } from '@/components/icons/theme/PlayIcon'

type Props = {
  title: Project['title']
  banner: Project['banner']
  cover: Project['cover']
  videoUrl?: Project['videoUrl']
}

export const ProjectBanner: React.FC<Props> = ({ title, banner, cover, videoUrl }) => {
  const [showYoutubeVideoDialog, toggleYoutubeVideoDialog] = useToggle()

  return (
    <>
      <div className='flex flex-col w-full h-[300px] md:h-[550px]'>
        <div className='relative w-full h-full'>
          <div>
            <Image
              src={banner}
              alt=''
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              className='max-sm:hidden md:rounded-xl shadow-lg'
            />
            <Image
              src={cover}
              alt={title + ' banner'}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className='sm:hidden shadow-lg'
            />
          </div>
          {!videoUrl && (
            <button
              className='absolute top-0 left-0 flex justify-center items-center w-full h-full'
              onClick={toggleYoutubeVideoDialog}
            >
              <PlayIcon className='fill-white size-24 flex py-6 pl-7 pr-5 bg-black bg-opacity-30 rounded-full shadow-lg backdrop-blur-lg' />
            </button>
          )}
        </div>
      </div>
      {videoUrl && (
        <YoutubeVideoDialog videoUrl={videoUrl} open={showYoutubeVideoDialog} toggleDialog={toggleYoutubeVideoDialog} />
      )}
    </>
  )
}
