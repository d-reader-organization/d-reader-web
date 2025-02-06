import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const ArrowRightIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ solid = false, ...props }, ref) => {
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
            d='M12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289C10.9024 4.68342 10.9024 5.31658 11.2929 5.70711L16.5858 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H16.5858L11.2929 18.2929C10.9024 18.6834 10.9024 19.3166 11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L12.7071 4.29289Z'
            fill='currentColor'
          />
        ) : (
          <path
            d='M5 12H19M19 12L12 5M19 12L12 19'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        )}
      </svg>
    )
  }
)

ArrowRightIcon.displayName = 'ArrowRightIcon'
