import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const CheckCircleIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
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
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM17.2071 9.70711C17.5976 9.31658 17.5976 8.68342 17.2071 8.29289C16.8166 7.90237 16.1834 7.90237 15.7929 8.29289L10.5 13.5858L8.20711 11.2929C7.81658 10.9024 7.18342 10.9024 6.79289 11.2929C6.40237 11.6834 6.40237 12.3166 6.79289 12.7071L9.79289 15.7071C10.1834 16.0976 10.8166 16.0976 11.2071 15.7071L17.2071 9.70711Z'
            fill='currentColor'
          />
        ) : (
          <path
            d='M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
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

CheckCircleIcon.displayName = 'CheckCircleIcon'
