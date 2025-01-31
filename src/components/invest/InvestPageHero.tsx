'use client'

import React from 'react'
import { Text } from '../ui'
import { PlayIcon } from 'lucide-react'
import { YoutubeVideoDialog } from '../shared/dialogs/YoutubeVideoDialog'
import { useToggle } from '@/hooks'
import InvestHeroCta from 'public/assets/images/invest/invest-cta.jpg'
import Image from 'next/image'
import { GenesisHeroFooterIcon } from '../icons/genesis/HeroFooterIcon'

export const InvestPageHero: React.FC = () => {
  const [showVideoDialog, toggleVideoDialog] = useToggle()

  return (
    <div className='flex flex-col justify-center gap-2 pt-12 lg:pt-16 bg-green-genesis'>
      <div className='flex flex-col justify-center items-center gap-2 pt-24 pb-16 px-4 md:px-8 text-center mx-auto mb-16 lg:mb-24'>
        <Text as='h1' styleVariant='primary-heading' className='text-40 sm:text-48 md:text-64'>
          Scout & Invest into
          <br />
          the future of storytelling
        </Text>
        <Text as='p' styleVariant='body-xlarge' className='max-w-[520px]'>
          Support original stories that will change the world.
        </Text>
      </div>
      <div className='relative w-full bg-grey-600'>
        <GenesisHeroFooterIcon className='absolute min-w-full fill-green-genesis' />
        <Image
          alt=''
          src={InvestHeroCta}
          width={2024}
          height={1138}
          priority
          className='relative w-full max-w-[90%] md:max-w-[760px] lg:max-w-[1000px] h-auto mx-auto aspect-video rounded-lg -mt-16 lg:-mt-24 shadow-[0px_0px_250px_-50px_rgba(0,0,0,0.8)]'
        />
        <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full'>
          <PlayIcon
            fill='white'
            className='relative cursor-pointer h-16 w-16 p-5 rounded-[25px] sm:h-28 sm:w-28 sm:p-8 sm:rounded-[40px] md:h-40 md:w-40 md:p-12 md:rounded-[60px] -mt-16 lg:-mt-24 bg-grey-400/50 backdrop-blur-sm'
            onClick={toggleVideoDialog}
          />
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
