import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const FilterIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
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
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10.33 16.593h-6.3M13.14 6.9h6.301'
            />
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8.726 6.846A2.355 2.355 0 0 0 6.363 4.5 2.355 2.355 0 0 0 4 6.846a2.355 2.355 0 0 0 2.363 2.347 2.355 2.355 0 0 0 2.363-2.347ZM20 16.554a2.354 2.354 0 0 0-2.363-2.346 2.355 2.355 0 0 0-2.364 2.346 2.355 2.355 0 0 0 2.364 2.346A2.354 2.354 0 0 0 20 16.554Z'
              clip-rule='evenodd'
            />
          </>
        ) : (
          <>
            {' '}
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10.33 16.593h-6.3M13.14 6.9h6.301'
            />
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8.726 6.846A2.355 2.355 0 0 0 6.363 4.5 2.355 2.355 0 0 0 4 6.846a2.355 2.355 0 0 0 2.363 2.347 2.355 2.355 0 0 0 2.363-2.347ZM20 16.554a2.354 2.354 0 0 0-2.363-2.346 2.355 2.355 0 0 0-2.364 2.346 2.355 2.355 0 0 0 2.364 2.346A2.354 2.354 0 0 0 20 16.554Z'
              clip-rule='evenodd'
            />
          </>
        )}
      </svg>
    )
  }
)

FilterIcon.displayName = 'FilterIcon'
