'use client'

import React from 'react'
import PageBanner from 'public/assets/page-banner.png'
import clsx from 'clsx'
import { useIsMobile } from '@/hooks/useBreakpoints'

type Props = {
  cover: string
}

export const ComicIssueBanner: React.FC<Props> = ({ cover }) => {
  const isMobile = useIsMobile()
  const heroImage = cover || PageBanner.src
  return (
    <div
      className='bg-cover bg-no-repeat bg-center absolute max-md:mt-20 -z-[1] w-full h-[65vh] max-h-[620px] blur-none md:blur-[10px]'
      style={{ backgroundImage: `url('${heroImage}')` }}
    >
      <div
        className={clsx(
          'absolute left-0 right-0 bottom-0 top-auto -z-[1] bg-0-top bg-repeat-x size-full',
          isMobile ? 'comic-issue-banner-simpler' : 'comic-issue-banner-standard'
        )}
      />
    </div>
  )
}
