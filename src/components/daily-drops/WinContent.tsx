import { Text } from '@/components/ui'
import { CircleIcon, ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'
import { CreatorInfoLink } from '@/components/creator/InfoLink'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ComicRarity } from '@/enums/comicRarity'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import { StateChip } from '../shared/chips/State'
import { DailyDropContentTitle } from './ContentTitle'
import { RarityChip } from '../shared/chips/RarityChip'
import { ShareOnX } from './ShareOnX'

type Props = {
  title: string
}

export const WinContent: React.FC<Props> = ({ title }) => {
  const twitterIntentComicMinted = ''
  return (
    <div className='flex flex-col items-center gap-8 overflow-hidden p-2'>
      <Realistic autorun={{ speed: 0.5, duration: 1000 }} />
      <ShareOnX />
      <DailyDropContentTitle title={title} />
      <div className='flex flex-wrap justify-center w-full max-w-[440px]'>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
          Your spin landed you an amazing&nbsp;
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='underline'>
          Tales from Peel City!
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium'>
          Find it in Your Library!
        </Text>
      </div>
      <Image
        alt='winning image'
        src='https://d-reader-main-mainnet.s3.us-east-1.amazonaws.com/comics/galactic-geckos-1729520286156/issues/episode-1-1729521154613/unused-signed-uncommon-cover-1729623456366.png'
        width={300}
        height={435}
        className='aspect-comic-issue-cover'
      />
      <div className='flex flex-col items-center gap-5 pb-4'>
        <CreatorInfoLink
          creator={{ name: 'GGSG', avatar: 'https://i.ibb.co/9ybztxb/image.png', isVerified: true, slug: 'ggsg' }}
        />
        <div className='flex justify-center items-center gap-4'>
          <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100'>
            Galactic Geckos
          </Text>
          <CircleIcon className='size-1' fill='#d9d9d9' />
          <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100'>
            EP 1
          </Text>
          <CircleIcon className='size-1' fill='#d9d9d9' />
          <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100'>
            #4123
          </Text>
          <CircleIcon className='size-1' fill='#d9d9d9' />
          <Link className='flex items-center py-0.5 gap-0.5 border-b border-grey-100' href={RoutePath.Library}>
            <ExternalLinkIcon className='size-3.5 text-grey-100' />
            <Text as='span' styleVariant='body-small' fontWeight='medium' className='text-grey-100'>
              view details
            </Text>
          </Link>
        </div>
        <div className='flex items-center gap-1'>
          <RarityChip rarity={ComicRarity.Legendary} />
          <StateChip state='mint' text='MINT' />
        </div>
      </div>
    </div>
  )
}
