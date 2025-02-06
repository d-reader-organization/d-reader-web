import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const BackIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
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
          d='M17.7071 4.29289C17.3166 3.90237 16.6834 3.90237 16.2929 4.29289C15.9024 4.68342 15.9024 5.31658 16.2929 5.70711L18.5858 8L7.5 8C4.46243 8 2 10.4624 2 13.5C2 16.5376 4.46243 19 7.5 19H12C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17H7.5C5.567 17 4 15.433 4 13.5C4 11.567 5.567 10 7.5 10L18.5858 10L16.2929 12.2929C15.9024 12.6834 15.9024 13.3166 16.2929 13.7071C16.6834 14.0976 17.3166 14.0976 17.7071 13.7071L21.7071 9.70711C22.0976 9.31658 22.0976 8.68342 21.7071 8.29289L17.7071 4.29289Z'
          fill='currentColor'
        />
      ) : (
        <path
          d='M21 9H7.5C5.01472 9 3 11.0147 3 13.5C3 15.9853 5.01472 18 7.5 18H12M21 9L17 5M21 9L17 13'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
})

BackIcon.displayName = 'BackIcon'
