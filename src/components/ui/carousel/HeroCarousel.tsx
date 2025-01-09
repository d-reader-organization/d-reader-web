'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { CarouselSlide, CarouselTag, CarouselTagType } from '@/models/carousel/carouselSlide'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/shared/Badge'
import Link from 'next/link'
import { getSlideFallbackUrl } from '@/utils/helpers'
import { Text } from '../Text'
import { CircleIcon } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from './Carousel'

type Props = {
  slides: CarouselSlide[]
}

export const HeroCarousel: React.FC<Props> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [emblaApi, setEmblaApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>()

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentSlide(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const dots = (
    <div className='flex justify-center items-center gap-4 px-4 md:px-6 max-h-4'>
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          className='transition-all duration-300 rounded-2xl w-full py-4 max-w-14 md:max-w-[90px]'
          onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
        >
          <span
            className={cn('flex w-full', dotIndex === currentSlide ? 'bg-yellow-300 h-[3px]' : 'bg-grey-200 h-[1px]')}
          ></span>
        </button>
      ))}
    </div>
  )

  return (
    <div className='flex flex-col gap-6 w-full max-w-screen-lg sm:mt-3 md:mt-6'>
      <Carousel
        className='w-full max-w-screen-lg h-60 sm:h-80 md:h-[530px]'
        opts={{ loop: true, duration: 40 }}
        plugins={[Autoplay({ delay: 5000, jump: false })]}
        setApi={(api) => setEmblaApi(api)}
      >
        <CarouselContent className='overflow-visible'>
          {slides.map((slide, index) => {
            const fallbackHref = getSlideFallbackUrl(slide)
            const isNextSlide = currentSlide + 1 >= slides.length ? index === 0 : currentSlide + 1 === index
            const linkTag = slide.tags?.find((tag) => tag.type === CarouselTagType.Button)
            return (
              <CarouselItem
                key={index}
                className='w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-lg h-full sm:rounded-xl hover:brightness-110'
              >
                <button
                  key={slide.title}
                  name={slide.title}
                  onClick={() => {
                    if (index !== currentSlide) {
                      if (isNextSlide) {
                        emblaApi?.scrollNext()
                        return
                      }
                      emblaApi?.scrollPrev()
                    }
                  }}
                  className={cn(
                    'flex relative transition-all duration-300 w-full h-60 sm:h-80 md:h-[530px]',
                    index !== currentSlide && 'sm:h-60 md:h-[475px]'
                  )}
                >
                  <Image
                    alt={slide.title + ' slide'}
                    src={slide.image}
                    fill
                    priority={index === 0}
                    className={cn(
                      'object-cover sm:rounded-xl w-full h-auto'
                      // 'shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]'
                    )}
                  />
                  <div
                    className='absolute inset-0 sm:rounded-xl'
                    style={{
                      background: isNextSlide
                        ? 'linear-gradient(90deg, rgba(21, 23, 28, 0.60) 0%, #15171C 30.36%)'
                        : currentSlide === index
                          ? 'linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)'
                          : 'linear-gradient(270deg, rgba(21, 23, 28, 0.60) 0%, #15171C 30.36%)',
                    }}
                  />
                  <Link
                    href={linkTag?.href ?? fallbackHref}
                    aria-disabled={currentSlide !== index}
                    target={!!linkTag?.href ? '_blank' : ''}
                    prefetch={index === 0}
                    className={cn(
                      'relative flex flex-col justify-center gap-8 h-full w-fit p-4 md:p-6 lg:p-8 sm:max-w-[90%] md:max-w-[70%]',
                      currentSlide !== index && 'opacity-0 pointer-events-none'
                    )}
                  >
                    <ChipSection tags={slide.tags?.filter((tag) => tag.type === CarouselTagType.Chip) ?? []} />
                    <div className='flex flex-col items-start gap-2'>
                      <Text as='h2' styleVariant='primary-heading' className='line-clamp-1 text-ellipsis text-start'>
                        {slide.title}
                      </Text>
                      <Text
                        as='p'
                        styleVariant='body-normal'
                        className='line-clamp-2 text-ellipsis text-start'
                        fontWeight='medium'
                      >
                        {slide.subtitle}
                      </Text>
                    </div>
                    <div className='bg-yellow-300 px-2 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl backdrop-blur-md flex justify-center items-center h-7 sm:h-[42px] w-fit'>
                      <Text as='span' styleVariant='body-small' fontWeight='bold' className='text-black uppercase'>
                        {linkTag?.title ?? 'See details'}
                      </Text>
                    </div>
                  </Link>
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      {dots}
    </div>
  )
}

type ChipSectionProps = {
  tags: CarouselTag[]
}

const ChipSection: React.FC<ChipSectionProps> = ({ tags }) => (
  <div className='flex items-center gap-2'>
    {tags.map((tag) => (
      <Badge key={tag.title} className='gap-2 items-center'>
        <CircleIcon className='text-white size-3' fill='#fff' />
        <Text as='span' styleVariant='body-normal' fontWeight='bold' className='uppercase'>
          {tag.title}
        </Text>
      </Badge>
    ))}
  </div>
)
