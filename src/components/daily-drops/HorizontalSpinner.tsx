'use client'

import { useEffect, useState } from 'react'
import { GroupPlaybackControls, motion, useAnimate, useMotionValue, useTransform } from 'framer-motion'
import { Button } from '@/components/ui'
import { DailyDropCardType } from '@/lib/types'
import { DailyDropCard } from './Card'
import { sleep } from '@/utils/helpers'

const CARDS: DailyDropCardType[] = [
  {
    id: 1,
    title: 'FREE COMIC',
    image: 'https://i.ibb.co/PmgbFwW/image.png',
  },
  {
    id: 2,
    title: 'FREE COLLECTIBLE',
    image: 'https://i.ibb.co/cxWRDDn/image.png',
  },
  {
    id: 3,
    title: 'PRINT EDITION',
    image: 'https://i.ibb.co/9ybztxb/image.png',
  },
  {
    id: 4,
    title: 'MAGIC MONEY',
    image: 'https://i.ibb.co/KXHZvMx/image.png',
  },
  {
    id: 5,
    title: 'SPECIAL ITEM',
    image: 'https://i.ibb.co/ZmDW1WG/All-random.jpg',
  },
  {
    id: 6,
    title: 'BAD LUCK',
    image: 'https://i.ibb.co/k9zvxcJ/image.png',
  },
  // {
  //   id: 7,
  //   title: 'MERCH',
  //   image: 'https://i.ibb.co/KXHZvMx/image.png',
  // },
  // {
  //   id: 8,
  //   title: 'SOCKS',
  //   image: 'https://i.ibb.co/KXHZvMx/image.png',
  // },
  // {
  //   id: 9,
  //   title: 'SOCKS',
  //   image: 'https://i.ibb.co/KXHZvMx/image.png',
  // },
]

const cardWidth = 200
const GAP = 12
const CARD_WITH_GAP = cardWidth + GAP
const MULTIPLE_CARDS_BY = 3
const MIDDLE_DIVISOR = 2

export const HorizontalSpinner: React.FC = () => {
  const cards = [...CARDS, ...CARDS, ...CARDS] // Triple the cards for smooth infinite scroll
  const initialCenteredIndex = Math.floor(cards.length / MIDDLE_DIVISOR)
  const isEvenCardsLength = !(CARDS.length % 2)
  const defaultXPosition = isEvenCardsLength ? cardWidth / MIDDLE_DIVISOR + GAP / MULTIPLE_CARDS_BY : 0 // we have to add defaultX position for even
  const scrollAdder = isEvenCardsLength ? CARD_WITH_GAP / MIDDLE_DIVISOR : 0

  const xTranslation = useMotionValue(-defaultXPosition)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [centeredIndex, setCenteredIndex] = useState<number>(initialCenteredIndex)

  const [scope, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    sleep(500).then(() => {
      const activeAnimation: GroupPlaybackControls = scope.animations.at(0)
      if (!!activeAnimation) {
        return
      }
      const width = scope.current.clientWidth
      const finalPosition = -width / MULTIPLE_CARDS_BY // - minus to go from left to right
      animate(xTranslation, [isEvenCardsLength ? -defaultXPosition : 0, finalPosition], {
        ease: 'linear',
        duration: CARDS.length * 2.5,
        repeat: Infinity,
        repeatType: 'reverse',
      })
    })
  }, [isSpinning])

  // useEffect(() => {
  //   if (!!intervalId) {
  //     return
  //   }
  //   let isReverse = false
  //   const lowerBoundary = defaultXPosition
  //   const upperBoundary = (CARD_WITH_GAP - GAP / MULTIPLE_CARDS_BY) * CARDS.length + defaultXPosition
  //   // add handling for reverse
  //   let index = initialCenteredIndex + 1
  //   const interval = setInterval(() => {
  //     index = index % CARDS.length
  //     const middle = initialCenteredIndex // Math.floor(CARDS.length / MIDDLE_DIVISOR)
  //     // reason why to add this ternary is: to obtain proper scroll position to have items from both sides
  //     const startPositionIndex = index > middle ? index - middle : index + CARDS.length - middle
  //     const factorAdder = isEvenCardsLength ? 2 : 0
  //     // (factorAdder + startPositionIndex * 4) this formula is needed to center properly
  //     const position = startPositionIndex * CARD_WITH_GAP + scrollAdder - (factorAdder + startPositionIndex * 4)

  //     if (position >= upperBoundary) {
  //       isReverse = true
  //     } else if (position <= lowerBoundary) {
  //       isReverse = false
  //     }
  //     isReverse ? --index : ++index
  //     animate(xTranslation, [xTranslation.get(), -position], {
  //       ease: 'linear',
  //       duration: 0.6,
  //     })
  //   }, 2000)
  //   setIntervalId(interval)
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  const centeredCardIndex = useTransform(xTranslation, (value) => {
    const adjustedScroll = Math.abs(value - CARD_WITH_GAP * CARDS.length + scrollAdder)
    const cardNumber = Math.round(adjustedScroll / CARD_WITH_GAP)
    const middleAdderNumber = Math.floor(CARDS.length / MIDDLE_DIVISOR)
    return cardNumber + middleAdderNumber
  })

  useEffect(() => {
    const unsubscribe = centeredCardIndex.on('change', (value) => {
      setCenteredIndex(value)
    })
    return () => unsubscribe()
  }, [centeredCardIndex])

  const startSpinning = async () => {
    const width = scope.current.clientWidth
    const finalPosition = -width / MULTIPLE_CARDS_BY // - minus to go from left to right
    if (!scope.current || isSpinning) {
      return
    }

    setIsSpinning(true)
    const activeAnimation: GroupPlaybackControls = scope.animations.at(0)
    activeAnimation.stop()

    animate(xTranslation, [isEvenCardsLength ? -defaultXPosition : 0, finalPosition], {
      ease: 'linear',
      duration: 0.4,
      repeat: 4,
      onComplete() {
        const winnerIndex = Math.round(Math.random() * CARDS.length)
        const middle = Math.floor(CARDS.length / MIDDLE_DIVISOR)
        // reason why to add this ternary is: to obtain proper scroll position to have items from both sides
        const startPositionIndex = winnerIndex > middle ? winnerIndex - middle : winnerIndex + CARDS.length - middle
        const factorAdder = isEvenCardsLength ? 2 : 0

        // (factorAdder + startPositionIndex * 4) this formula is needed to center properly
        const position = startPositionIndex * CARD_WITH_GAP + scrollAdder - (factorAdder + startPositionIndex * 4)

        xTranslation.jump(-position)
        setIsSpinning(false)
      },
    })
  }
  return (
    <div className='w-full overflow-hidden flex flex-col items-center gap-2'>
      <motion.div
        // animate={controls}
        // animate={{ x: xTranslation.get() - defaultXPosition }}
        className='flex gap-2 items-center justify-center min-h-[350px]'
        style={{ x: xTranslation }}
        // transition={{ duration: 0.5, ease: 'linear' }}
        ref={scope}
      >
        {cards.map((card, index) => (
          <DailyDropCard card={card} index={index} centeredIndex={centeredIndex} key={`${card.id}-${index}`} />
        ))}
      </motion.div>
      <Button size='lg' className='max-w-[220px] w-full' onClick={startSpinning} disabled={isSpinning}>
        Spin
      </Button>
      {/* <div className='flex gap-2 items-center w-[220px]'>
        <Button size='lg' variant='secondary' icon={Clock4} className='w-full'>
          <Text as='span' styleVariant='body-normal' fontWeight='bold'>
            19:33:21
          </Text>
        </Button>
        <Button size='lg' iconClassname='fill-grey-100' variant='secondary' icon={PlayIcon} iconOnly />
      </div> */}
    </div>
  )
}
