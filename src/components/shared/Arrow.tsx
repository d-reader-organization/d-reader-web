'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

type ArrowOrientation = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT'

type Props = {
  arrowOrientation: ArrowOrientation
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const orientationClasses: Record<ArrowOrientation, string> = {
  BOTTOM: 'rotate-90',
  LEFT: 'rotate-180',
  RIGHT: '',
  TOP: '-rotate-90',
}

export const Arrow: React.FC<Props> = ({ arrowOrientation, className, onClick }) => {
  return (
    <button
      className={cn(
        'inline-flex justify-center items-center size-[42px] rounded-xl bg-grey-400 hover:brightness-125',
        className
      )}
      name={`Arrow ${arrowOrientation}`}
      onClick={onClick}
    >
      <ChevronRight className={cn(orientationClasses[arrowOrientation], 'text-grey-100')} />
    </button>
  )
}
