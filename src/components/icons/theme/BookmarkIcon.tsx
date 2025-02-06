import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const BookmarkIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(
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
            d='M9.7587 2H14.2413C15.0463 1.99999 15.7106 1.99998 16.2518 2.04419C16.8139 2.09012 17.3306 2.18868 17.816 2.43597C18.5686 2.81947 19.1805 3.43139 19.564 4.18404C19.8113 4.66937 19.9099 5.18608 19.9558 5.74817C20 6.28938 20 6.95374 20 7.75873V21C20 21.3565 19.8102 21.686 19.5019 21.8649C19.1936 22.0438 18.8134 22.0451 18.5039 21.8682L12 18.1518L5.49614 21.8682C5.18664 22.0451 4.80639 22.0438 4.49807 21.8649C4.18976 21.686 4 21.3565 4 21L4 7.7587C3.99999 6.95373 3.99998 6.28937 4.04419 5.74817C4.09012 5.18608 4.18868 4.66937 4.43597 4.18404C4.81947 3.43139 5.43139 2.81947 6.18404 2.43597C6.66937 2.18868 7.18608 2.09012 7.74817 2.04419C8.28937 1.99998 8.95373 1.99999 9.7587 2Z'
            fill='currentColor'
          />
        ) : (
          <path
            d='M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z'
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

BookmarkIcon.displayName = 'BookmarkIcon'
