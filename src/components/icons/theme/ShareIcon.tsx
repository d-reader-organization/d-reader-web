import React from 'react'
import { VariantSvgIconProps } from '@/lib/types'

export const ShareIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={solid ? 'currentColor' : 'none'}
    >
      {solid ? (
        <path
          d='M14 5C14 2.79086 15.7909 1 18 1C20.2091 1 22 2.79086 22 5C22 7.20914 20.2091 9 18 9C16.8885 9 15.883 8.54668 15.1581 7.81485L9.85034 10.9123C9.94784 11.2581 10 11.623 10 12C10 12.3768 9.9479 12.7415 9.8505 13.0871L15.1613 16.1819C15.886 15.452 16.8902 15 18 15C20.2091 15 22 16.7909 22 19C22 21.2091 20.2091 23 18 23C15.7909 23 14 21.2091 14 19C14 18.6214 14.0526 18.255 14.1509 17.9079L8.84235 14.8144C8.11742 15.5465 7.11167 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.11146 8 8.11703 8.45332 8.84193 9.18514L14.1497 6.08767C14.0522 5.74185 14 5.37701 14 5Z'
          fill='currentColor'
        />
      ) : (
        <path
          d='M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
})

ShareIcon.displayName = 'ShareIcon'
