import React from 'react'
import PageBanner from 'public/assets/page-banner.png'
import Image from 'next/image'

type Props = {
  cover: string
}

export const ComicIssueBanner: React.FC<Props> = ({ cover }) => {
  const heroImageWithFallback = cover || PageBanner.src

  return (
    <div className='absolute w-full h-[20vh] sm:h-[65vh] max-h-[650px] overflow-hidden max-md:mt-20 -z-[1]'>
      <div className='absolute w-full h-[100%] md:h-[134%]'>
        <Image
          src={heroImageWithFallback}
          alt=''
          priority
          fill
          className='absolute -z-[1] object-cover object-top opacity-10'
        />
      </div>
      <div className='absolute left-0 right-0 bottom-0 top-auto -z-[1] bg-0-top bg-repeat-x size-full bg-gradient-to-b from-grey-600/20 to-grey-600/100' />
    </div>
  )
}
