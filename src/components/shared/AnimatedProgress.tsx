import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

type AnimatedProgressProps = {
  durationInSeconds: number
  value: number
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ durationInSeconds, value }) => {
  const progressValue = useMotionValue(0)

  useEffect(() => {
    const animation = animate(progressValue, value, {
      duration: durationInSeconds,
    })

    return animation.stop
  }, [progressValue, durationInSeconds, value])

  return (
    <div className='relative h-2.5 w-full overflow-hidden rounded-[27px] bg-[#D9D9D9] bg-opacity-20'>
      <motion.div
        className='h-full w-full flex-1 bg-green-genesis transition-all rounded-[27px]'
        style={{
          width: useTransform(progressValue, (value) => `${value}%`),
        }}
      />
    </div>
  )
}
