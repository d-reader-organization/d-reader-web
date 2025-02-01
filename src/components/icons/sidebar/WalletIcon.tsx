import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const WalletIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ className, solid, ...props }, ref) => {
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
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6L19 6C20.6569 6 22 7.34315 22 9V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H5ZM16.5 12.5C15.6716 12.5 15 13.1716 15 14C15 14.8284 15.6716 15.5 16.5 15.5C17.3284 15.5 18 14.8284 18 14C18 13.1716 17.3284 12.5 16.5 12.5Z'
            fill='currentColor'
          />
        ) : (
          <path
            d='M16.5 14H16.51M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7L5 7C3.89543 7 3 6.10457 3 5ZM3 5C3 3.89543 3.89543 3 5 3H17M17 14C17 14.2761 16.7761 14.5 16.5 14.5C16.2239 14.5 16 14.2761 16 14C16 13.7239 16.2239 13.5 16.5 13.5C16.7761 13.5 17 13.7239 17 14Z'
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

WalletIcon.displayName = 'WalletIcon'
