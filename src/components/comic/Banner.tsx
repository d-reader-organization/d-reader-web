import React from 'react'
import PageBanner from 'public/assets/page-banner.png'
import Image from 'next/image'

type Props = {
  banner?: string
  cover?: string
  logo?: string
}

export const ComicBanner: React.FC<Props> = ({ banner, logo }) => {
  const heroImageWithFallback = banner || PageBanner.src

  return (
    <div className='absolute w-full h-[20vh] sm:h-[65vh] max-h-[650px] overflow-hidden max-md:mt-20'>
      {/* <Image
        src={heroImageWithFallback}
        alt=''
        priority
        fill
        className='bg-contain bg-no-repeat bg-center absolute -z-[1]'
      /> */}
      <div className='absolute w-full h-[100%] md:h-[134%]'>
        <Image src={heroImageWithFallback} alt='' priority fill className='absolute -z-[1] object-cover object-top' />
      </div>
      <div className='absolute left-0 right-0 bottom-0 top-auto -z-[1] bg-0-top bg-repeat-x size-full bg-gradient-to-t from-grey-600 to-[#15171C99]' />
      {logo && (
        <Image
          src={logo}
          alt=''
          priority
          width={600}
          height={300}
          className='w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 object-contain max-h-[100px] max-w-[36%] sm:max-w-[30%] sm:max-h-[120px] md:max-w-[28%] md:max-h-36'
        />
      )}
    </div>
  )
}
