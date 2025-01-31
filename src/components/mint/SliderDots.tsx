import { cn } from '@/lib/utils'
import { getRarityColor, getRarityTextColor } from '@/utils/rarity'
import React from 'react'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import { RarityIcon } from '../icons/rarity/RarityIcon'

type DotsProps = {
  emblaApi?: { scrollTo: (index: number) => void }
  slides: StatelessCover[]
  selectedIndex: number
}

export const SliderDots: React.FC<DotsProps> = ({ emblaApi, slides, selectedIndex }) => {
  const currentRarity = slides[selectedIndex].rarity
  return (
    <div className='flex justify-center items-center gap-4 relative bottom-8 px-4 md:px-6 max-h-4'>
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          className={cn('transition-all duration-300 rounded-2xl w-full py-4 flex flex-col items-center gap-4')}
          onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
        >
          <RarityIcon
            className={cn(
              'w-4 h-3.5',
              selectedIndex === dotIndex ? 'block' : 'invisible',
              getRarityTextColor(currentRarity)
            )}
          />

          <span
            className={cn(
              'flex w-full',
              dotIndex === selectedIndex ? cn('h-[3px]', getRarityColor(currentRarity)) : 'bg-grey-200 h-[1px]'
            )}
          ></span>
        </button>
      ))}
    </div>
  )
}
