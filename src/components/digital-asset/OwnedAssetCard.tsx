import React from 'react'
import Image from 'next/image'
import { RarityChip } from '@/components/shared/chips/RarityChip'
import { StateChip } from '../shared/chips/State'
import { CardBorderWrapper } from '../shared/CardBorderWrapper'
import { shortenAssetName } from '@/utils/helpers'
import { CollectibleComic } from '@/models/comic/collectibleComic'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'
import { SignedTraitChip } from '../shared/chips/SignedTraitChip'

type Props = {
  asset: CollectibleComic
}

export const OwnedAssetCard: React.FC<Props> = ({ asset }) => (
  <CardBorderWrapper className='rounded-xl w-fit'>
    <div className='flex flex-col items-center hover:brightness-105'>
      <Image
        alt={'asset ' + shortenAssetName(asset.name)}
        width={690}
        height={1000}
        src={asset.image}
        className=' w-[140px] sm:w-[210px] h-full'
      />
      <div className='flex items-center -mt-3.5'>
        <RarityChip rarity={asset.rarity} border />
        <UsedTraitChip used={asset.isUsed} border compact />
        <SignedTraitChip signed={asset.isUsed} border compact hideSecondaryTrait />
      </div>
    </div>
  </CardBorderWrapper>
)
