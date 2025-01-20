import { DailyDropCardType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  card: DailyDropCardType
  index: number
  selectedIndex: number
}

export const DailyDropCard: React.FC<Props> = ({ card, index, selectedIndex }) => {
  const distance = Math.abs(index - selectedIndex)
  return (
    <motion.div
      // animate={{
      //   y: [8, -8],
      // }}
      // transition={{
      //   duration: 1,
      //   repeat: Infinity,
      //   repeatType: 'reverse',
      //   ease: 'linear',
      // }}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        // height: distance === 0 ? '330px' : distance === 1 ? '300px' : '270px',
        // width: distance === 0 ? '220px' : distance === 1 ? '210px' : '200px',
        // opacity: distance === 0 ? 1 : distance === 1 ? 0.85 : 0.65,
      }}
      transition={{
        duration: 0.1,
        ease: 'linear',
      }}
      className={cn(
        'rounded-xl flex justify-center items-center bg-grey-300 relative',
        distance === 0 ? 'w-[220px] h-[330px]' : distance === 1 ? 'w-[210px] h-[300px]' : 'w-[200px] h-[270px]',
        distance === 0 ? '' : distance === 1 ? 'scale-90 opacity-50' : 'scale-[0.8] opacity-25'
      )}
    >
      <Image alt={card.title} src={card.image} fill className='rounded-xl' sizes='(max-width: 580px) 200px, 330px' />
    </motion.div>
  )
}
