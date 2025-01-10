import { RarityChip } from '@/components/shared/chips/Rarity'
import Image from 'next/image'
import React from 'react'
import { StateChip } from '../shared/chips/State'
import { CardBorderWrapper } from '../shared/CardBorderWrapper'
import { shortenAssetName } from '@/utils/helpers'
import { CollectibleComic } from '@/models/comic/collectibleComic'

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
        <RarityChip rarity={asset.rarity} />
        {asset.isUsed ? <StateChip state='used' /> : <StateChip state='mint' />}
        {asset.isSigned ? <StateChip state='signed' /> : null}
      </div>
    </div>
  </CardBorderWrapper>
)
