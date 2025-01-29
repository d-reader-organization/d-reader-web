import React from 'react'
import Image from 'next/image'
import { RarityChip } from '@/components/shared/chips/RarityChip'
import { CardBorderWrapper } from '../shared/CardBorderWrapper'
import { shortenAssetName } from '@/utils/helpers'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'
import { CollectibleComic } from '@/models/asset'

type Props = {
  collectibleComic: CollectibleComic
}

export const OwnedCollectibleComicCard: React.FC<Props> = ({ collectibleComic }) => (
  <CardBorderWrapper className='rounded-xl w-fit'>
    <div className='flex flex-col items-center hover:brightness-105'>
      <Image
        alt={'collectibleComic ' + shortenAssetName(collectibleComic.name)}
        width={690}
        height={1000}
        src={collectibleComic.image}
        className=' w-[140px] sm:w-[210px] h-full'
      />
      <div className='flex items-center -mt-3.5'>
        <RarityChip rarity={collectibleComic.rarity} border />
        <UsedTraitChip used={collectibleComic.isUsed} border compact />
        <SignedTraitChip signed={collectibleComic.isUsed} border compact hideSecondaryTrait />
      </div>
    </div>
  </CardBorderWrapper>
)
