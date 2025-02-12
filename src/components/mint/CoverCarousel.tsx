'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import useToggle from '@/hooks/useToggle'
import { CoverPreviewDialog } from './CoverPreviewDialog'
import { CoverSlide } from './CoverSlide'
import { SliderDots } from './SliderDots'
import { CandyMachine } from '@/models/candyMachine'
import { Nullable } from '@/models/common'

type Props = { candyMachine: Nullable<CandyMachine>; covers: StatelessCover[] }

export const CoverCarousel: React.FC<Props> = ({ candyMachine, covers }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnMouseEnter: true })])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isCoverPreviewOpen, toggleCoverPreview] = useToggle()
  const hasCoverVariants = covers.length > 1

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    onSelect()
    emblaApi?.on('select', onSelect)
    return () => {
      emblaApi?.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className='flex flex-col gap-14 md:gap-16'>
      <div className='max-w-64 md:max-w-[354px] relative'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {covers.map((cover, index) => (
              <CoverSlide
                cover={cover}
                isPriority={index === 0}
                totalSupply={candyMachine?.supply ?? 0}
                key={`${cover.rarity}-${index}`}
                onClick={() => toggleCoverPreview()}
              />
            ))}
          </div>
        </div>
      </div>
      {hasCoverVariants && <SliderDots emblaApi={emblaApi} slides={covers} selectedIndex={selectedIndex} />}
      <CoverPreviewDialog
        cover={covers[selectedIndex]}
        candyMachine={candyMachine}
        hideArrows={covers.length < 2}
        open={isCoverPreviewOpen}
        onPrevClick={() => {
          emblaApi?.scrollPrev()
        }}
        onNextClick={() => {
          emblaApi?.scrollNext()
        }}
        onOpenChange={() => toggleCoverPreview()}
      />
    </div>
  )
}
