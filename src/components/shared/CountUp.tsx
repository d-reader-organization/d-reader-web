import { formatCurrency } from '@/utils/numbers'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function CountUp({ value = 100, duration = 2 }) {
  const count = useMotionValue(0)
  const animatedValue = useTransform(count, (latest) => {
    const rounded = Math.round(latest)
    const currencyFormat = formatCurrency({ value: rounded, fractionDigits: 0 })
    return currencyFormat
  })

  useEffect(() => {
    const controls = animate(count, value, { duration })
    return controls.stop
  }, [value, duration, count])

  return <motion.span>{animatedValue}</motion.span>
}
