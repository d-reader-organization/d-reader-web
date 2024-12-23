import React from 'react'
import Image from 'next/image'
import { Creator } from '@/models/creator'
import { CREATOR_BANNER_SIZE } from '@/constants/imageSizes'
import { AvatarImage } from '../shared/AvatarImage'
import { Socials } from '../shared/Socials'

type Props = {
  creator: Creator
}

export const CreatorBanner: React.FC<Props> = ({ creator }) => {
  return (
    <div className='flex w-full relative'>
      <Image
        src={creator.banner}
        alt=''
        {...CREATOR_BANNER_SIZE}
        className='w-full rounded-xl aspect-[10/9] h-[140px] object-top object-cover sm:rounded-2xl sm:h-[300px]'
      />
      <AvatarImage
        src={creator.avatar}
        size='large'
        className='absolute border-4 border-white border-opacity-20 w-[124px] h-[124px] max-sm:-bottom-7 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:w-20 max-sm:h-20 max-md:w-24 max-md:h-24 sm:-bottom-7 sm:left-4'
      />
      <Socials
        website={creator.website}
        instagram={creator.instagram}
        twitter={creator.twitter}
        className='absolute bottom-3 right-3'
      />
    </div>
  )
}
