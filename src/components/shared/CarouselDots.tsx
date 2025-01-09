'use client'

import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  emblaApi?: { scrollTo: (index: number) => void }
  slides: Array<unknown>
  selectedIndex: number
  selectedSliderColor?: string
  topWidget?: React.ReactNode
}

export const CarouselDots: React.FC<Props> = ({
  emblaApi,
  selectedIndex,
  selectedSliderColor = 'bg-yellow-300',
  slides,
  topWidget,
}) => (
  <div className='flex justify-center items-center gap-4 bottom-8 px-4 md:px-6 max-h-4'>
    {slides.map((_, dotIndex) => (
      <button
        key={dotIndex}
        className={cn(
          'transition-all duration-300 rounded-2xl w-full max-w-[90px] py-4 flex flex-col items-center gap-1'
        )}
        onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
      >
        {topWidget}
        <span
          className={cn(
            'flex w-full',
            dotIndex === selectedIndex ? cn('h-[3px]', selectedSliderColor) : 'bg-grey-200 h-[1px]'
          )}
        ></span>
      </button>
    ))}
  </div>
)
