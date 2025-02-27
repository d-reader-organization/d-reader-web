'use client'

import React from 'react'
import Image from 'next/image'
import { useToggle } from '@/hooks'
import { PlayIcon } from '@/components/icons/theme/PlayIcon'
import { Campaign } from '@/models/campaign'
import { isEmpty } from 'lodash'

type Props = {
  title: Campaign['title']
  banner: Campaign['banner']
  cover: Campaign['cover']
  videoUrl?: Campaign['videoUrl']
}

export const ProjectBanner: React.FC<Props> = ({ title, banner, cover, videoUrl }) => {
  const [playVideo, togglePlayVideo] = useToggle()

  return (
    <div className='flex flex-col w-full md:h-[450px] max-w-[750px]'>
      {!isEmpty(videoUrl) ? (
        <div className='relative w-full h-auto'>
          <iframe
            src={`${videoUrl}&autoplay=${playVideo}&controls=1&mute=0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&vq=hd720`}
            className='w-full h-auto aspect-video rounded-lg'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            title={title}
            referrerPolicy='strict-origin-when-cross-origin'
          />
          {!playVideo && (
            <button
              className='absolute top-0 left-0 flex justify-center items-center w-full h-full'
              onClick={togglePlayVideo}
            >
              <PlayIcon className='fill-white size-24 flex py-6 pl-7 pr-5 bg-black bg-opacity-30 rounded-full shadow-lg backdrop-blur-lg' />
            </button>
          )}
        </div>
      ) : (
        <div className='relative w-full min-h-[300px] h-full'>
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
      )}
    </div>
  )
}
