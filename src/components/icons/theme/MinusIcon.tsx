import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const MinusIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={solid ? 'currentColor' : 'none'}
    >
      {solid ? (
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z'
          fill='currentColor'
        />
      ) : (
        <path d='M5 12H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      )}
    </svg>
  )
})

MinusIcon.displayName = 'MinusIcon'
