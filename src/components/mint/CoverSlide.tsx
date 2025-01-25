import Image from 'next/image'
import React from 'react'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import { RarityChip } from '../shared/chips/RarityChip'
import { getRaritySupply } from '@/utils/mint'

type Props = {
  cover: StatelessCover
  isPriority: boolean
  totalSupply: number
  onClick: () => void
}

export const CoverSlide: React.FC<Props> = ({ cover, isPriority, totalSupply, onClick }) => (
  <button
    className='relative flex-[0_0_100%] max-h-[400px] md:max-h-[520px] flex flex-col items-center justify-center hover:brightness-110'
    onClick={onClick}
  >
    <Image
      alt={cover.rarity + ' cover'}
      src={cover.image}
      width='0'
      height='0'
      priority={isPriority}
      sizes='(max-width: 350px) 100vw, 350px'
      className='rounded-2xl min-h-96 w-full object-cover'
    />
    <RarityChip className='-mt-3.5' rarity={cover.rarity} supply={getRaritySupply(totalSupply, cover.share)} border />
  </button>
)
