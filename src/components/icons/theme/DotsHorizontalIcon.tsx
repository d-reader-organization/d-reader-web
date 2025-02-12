import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const DotsHorizontalIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ solid = false, className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill={solid ? 'currentColor' : 'none'}
      >
        {solid ? (
          <>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12Z'
              fill='currentColor'
            />
          </>
        ) : (
          <>
            <path
              d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </>
        )}
      </svg>
    )
  }
)

DotsHorizontalIcon.displayName = 'DotsHorizontalIcon'
