import { formatCurrency } from '@/utils/numbers'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

type Props = { value?: number; durationInSeconds?: number } & Pick<React.HTMLAttributes<HTMLSpanElement>, 'className'>

export const CountUp: React.FC<Props> = ({ durationInSeconds = 2, value = 100, className }) => {
  const count = useMotionValue(0)
  const animatedValue = useTransform(count, (latest) => {
    const rounded = Math.round(latest)
    const currencyFormat = formatCurrency({ value: rounded, fractionDigits: 0 })
    return currencyFormat
  })

  useEffect(() => {
    const controls = animate(count, value, { duration: durationInSeconds })
    return controls.stop
  }, [value, durationInSeconds, count])

  return <motion.span className={className}>{animatedValue}</motion.span>
}
