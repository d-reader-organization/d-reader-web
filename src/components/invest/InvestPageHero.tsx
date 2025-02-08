'use client'

import React from 'react'
import { Text } from '../ui'
import { YoutubeVideoDialog } from '../shared/dialogs/YoutubeVideoDialog'
import { useToggle } from '@/hooks'
import InvestHeroCta from 'public/assets/images/invest/invest-cta.jpg'
import Image from 'next/image'
import { GenesisHeroFooterIcon } from '@/components/icons/genesis/HeroFooterIcon'
import { PlayIcon } from '@/components/icons/theme/PlayIcon'

export const InvestPageHero: React.FC = () => {
  const [showVideoDialog, toggleVideoDialog] = useToggle()

  return (
    <div className='flex flex-col justify-center gap-2 pt-12 lg:pt-16 bg-green-genesis'>
      <div className='flex flex-col justify-center items-center gap-2 pt-24 pb-16 px-4 md:px-8 text-center mx-auto mb-16 lg:mb-24'>
        <Text as='h1' styleVariant='primary-heading' className='text-40 sm:text-48 md:text-64'>
          Scout & Invest into
          <br />
          breakthrough stories
        </Text>
        <Text as='h4' styleVariant='body-xlarge' className='max-w-[520px]'>
          Support original content and get rewarded!
        </Text>
      </div>
      <div className='relative w-full bg-grey-600'>
        <GenesisHeroFooterIcon className='absolute min-w-full fill-green-genesis' />
        <div className='relative w-full max-w-[90%] md:max-w-[760px] lg:max-w-[1000px] h-auto mx-auto aspect-video rounded-lg shadow-[0px_0px_250px_-50px_rgba(0,0,0,0.8)]'>
          <Image alt='' src={InvestHeroCta} width={2024} height={1138} priority className='size-full' />
          <button
            className='absolute top-0 left-0 flex justify-center items-center w-full h-full'
            onClick={toggleVideoDialog}
          >
            <PlayIcon className='flex fill-white size-24 p-6 rounded-[32px] md:size-32 md:p-8 md:rounded-[48px] bg-grey-400/50 backdrop-blur-sm shadow-lg' />
          </button>
        </div>
      </div>
      <YoutubeVideoDialog
        open={showVideoDialog}
        toggleDialog={toggleVideoDialog}
        title='Genesis promotional video'
        videoUrl='https://www.youtube.com/embed/QjdGuCf6n08?si=U4t2m5yPnwgVLvwG'
      />
    </div>
  )
}
