import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const RoyaltyIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ className, solid = false, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        {...props}
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill={solid ? 'currentColor' : 'none'}
      >
        {solid ? (
          <>
            <path
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z'
            />
            <path d='M5 21h14' stroke='currentColor' strokeWidth='2' />
          </>
        ) : (
          <>
            <path
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z'
            />
            <path d='M5 21h14' stroke='currentColor' strokeWidth='2' />
          </>
        )}
      </svg>
    )
  }
)

RoyaltyIcon.displayName = 'RoyaltyIcon'
