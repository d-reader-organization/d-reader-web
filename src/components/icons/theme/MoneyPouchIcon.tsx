import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const MoneyPouchIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
  ({ solid = false, className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 26'
        fill={solid ? 'currentColor' : 'none'}
      >
        {solid ? (
          <path
            d='M24 18c0 5.519-5 8-12 8S0 23.52 0 18.04c0-6 3-9.04 9-12.081L6.875 2a1.3 1.3 0 0 1 1.12-2h8.48a1.3 1.3 0 0 1 1.12 1.9L15 5.958C20.998 8.958 24 11.998 24 18ZM13.16 9.076a1.16 1.16 0 0 0-2.32 0v1.165a3.23 3.23 0 0 0-.554 6.388l2.735.598a1.16 1.16 0 0 1-.247 2.296h-1.548a1.161 1.161 0 0 1-1.096-.773 1.162 1.162 0 1 0-2.187.773 3.491 3.491 0 0 0 2.896 2.3v1.182a1.161 1.161 0 0 0 2.322 0v-1.182a3.483 3.483 0 0 0 .356-6.864l-2.735-.598a.91.91 0 0 1 .195-1.8h1.797a1.15 1.15 0 0 1 1.096.772 1.16 1.16 0 0 0 2.187-.775 3.473 3.473 0 0 0-2.896-2.299V9.076Z'
            fillRule='evenodd'
            clipRule='evenodd'
          />
        ) : (
          <path
            stroke='currentColor'
            strokeWidth='2'
            d='M24 18c0 5.519-5 8-12 8S0 23.52 0 18.04c0-6 3-9.04 9-12.081L6.875 2a1.3 1.3 0 0 1 1.12-2h8.48a1.3 1.3 0 0 1 1.12 1.9L15 5.958C20.998 8.958 24 11.998 24 18ZM13.16 9.076a1.16 1.16 0 0 0-2.32 0v1.165a3.23 3.23 0 0 0-.554 6.388l2.735.598a1.16 1.16 0 0 1-.247 2.296h-1.548a1.161 1.161 0 0 1-1.096-.773 1.162 1.162 0 1 0-2.187.773 3.491 3.491 0 0 0 2.896 2.3v1.182a1.161 1.161 0 0 0 2.322 0v-1.182a3.483 3.483 0 0 0 .356-6.864l-2.735-.598a.91.91 0 0 1 .195-1.8h1.797a1.15 1.15 0 0 1 1.096.772 1.16 1.16 0 0 0 2.187-.775 3.473 3.473 0 0 0-2.896-2.299V9.076Z'
            fillRule='evenodd'
            clipRule='evenodd'
          />
        )}
      </svg>
    )
  }
)

MoneyPouchIcon.displayName = 'MoneyPouchIcon'
