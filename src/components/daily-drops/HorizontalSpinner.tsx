'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, Easing, motion, px, useMotionValue, useTransform } from 'framer-motion'
import { Button } from '@/components/ui'
import { DailyDropCardType } from '@/lib/types'
import { DailyDropCard } from './Card'

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

  {
    id: 7,
    title: 'MERCH',
    image: 'https://i.ibb.co/KXHZvMx/image.png',
  },
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
  const containerRef = useRef<HTMLDivElement>(null)
  const isEvenCardsLength = !(CARDS.length % 2)
  const defaultXPosition = isEvenCardsLength ? cardWidth / MIDDLE_DIVISOR + GAP / MULTIPLE_CARDS_BY : 0 // we have to add defaultX position for even
  const scrollAdder = isEvenCardsLength ? CARD_WITH_GAP / MIDDLE_DIVISOR : 0

  const xTranslation = useMotionValue(-defaultXPosition)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [centeredIndex, setCenteredIndex] = useState<number>(initialCenteredIndex)

  const centeredCardIndex = useTransform(xTranslation, (value) => {
    const adjustedScroll = Math.abs(value)
    const result = Math.round((adjustedScroll + scrollAdder) / CARD_WITH_GAP)
    const someNumber = isEvenCardsLength ? 3 : 2
    const middleAdderNumber = Math.floor(CARDS.length / MIDDLE_DIVISOR) - someNumber
    const startingIndex = result + CARDS.length + middleAdderNumber

    return startingIndex + 2
  })

  useEffect(() => {
    const unsubscribe = centeredCardIndex.on('change', (value) => {
      setCenteredIndex(value)
    })
    return () => unsubscribe()
  }, [centeredCardIndex])

  const startSpinning = () => {
    if (!containerRef.current || isSpinning) {
      return
    }
    setIsSpinning(true)

    const width = containerRef.current.clientWidth
    const finalPosition = -width / MULTIPLE_CARDS_BY // - minus to go from left to right
    animate(xTranslation, [isEvenCardsLength ? -defaultXPosition : 0, finalPosition], {
      ease: 'linear',
      duration: 0.5,
      repeat: 5,
      repeatType: 'loop',
      repeatDelay: 0,
      onComplete() {
        const winnerIndex = Math.round(Math.random() * CARDS.length)
        const middle = Math.floor(CARDS.length / MIDDLE_DIVISOR)
        // reason why to add this ternary is: to obtain proper scroll position to have items from both sides
        const startPositionIndex = winnerIndex > middle ? winnerIndex - middle : winnerIndex + CARDS.length - middle
        const factorAdder = isEvenCardsLength ? 2 : 0

        // (factorAdder + startPositionIndex * 4) this formula is needed to center properly
        const position = startPositionIndex * CARD_WITH_GAP + scrollAdder - (factorAdder + startPositionIndex * 4)
        console.log(`winner should be ${cards[winnerIndex].title}`, position)

        xTranslation.jump(-position)
        setIsSpinning(false)
      },
    })
  }

  return (
    <div className='w-full overflow-hidden flex flex-col items-center gap-2'>
      <motion.div
        className='flex gap-2 items-center justify-center min-h-[350px]'
        style={{ x: xTranslation }}
        ref={containerRef}
      >
        {cards.map((card, index) => (
          <DailyDropCard card={card} index={index} selectedIndex={centeredIndex} key={`${card.id}-${index}`} />
        ))}
      </motion.div>
      <Button size='lg' className='max-w-[220px] w-full' onClick={startSpinning} disabled={isSpinning}>
        Spin
      </Button>
    </div>
  )
}
