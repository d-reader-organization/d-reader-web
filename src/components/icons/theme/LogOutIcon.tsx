import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const LogOutIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
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
            d='M7.7587 2H9C9.55229 2 10 2.44772 10 3C10 3.55229 9.55229 4 9 4H7.8C6.94342 4 6.36113 4.00078 5.91104 4.03755C5.47262 4.07337 5.24842 4.1383 5.09202 4.21799C4.7157 4.40973 4.40974 4.7157 4.21799 5.09202C4.1383 5.24842 4.07337 5.47262 4.03755 5.91104C4.00078 6.36113 4 6.94342 4 7.8L4 16.2C4 17.0566 4.00078 17.6389 4.03755 18.089C4.07337 18.5274 4.1383 18.7516 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.24842 19.8617 5.47262 19.9266 5.91104 19.9624C6.36113 19.9992 6.94342 20 7.8 20H9C9.55229 20 10 20.4477 10 21C10 21.5523 9.55229 22 9 22H7.75868C6.95372 22 6.28936 22 5.74818 21.9558C5.18608 21.9099 4.66937 21.8113 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43598 19.816C2.18868 19.3306 2.09012 18.8139 2.04419 18.2518C1.99998 17.7106 1.99999 17.0463 2 16.2413V7.75871C1.99999 6.95375 1.99998 6.28936 2.0442 5.74818C2.09012 5.18608 2.18869 4.66937 2.43598 4.18404C2.81947 3.43139 3.43139 2.81947 4.18404 2.43598C4.66938 2.18868 5.18608 2.09012 5.74818 2.04419C6.28937 1.99998 6.95374 1.99999 7.7587 2Z'
            fill='currentColor'
          />
          <path
            d='M15.2929 6.29289C15.6834 5.90237 16.3166 5.90237 16.7071 6.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L16.7071 17.7071C16.3166 18.0976 15.6834 18.0976 15.2929 17.7071C14.9024 17.3166 14.9024 16.6834 15.2929 16.2929L18.5858 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H18.5858L15.2929 7.70711C14.9024 7.31658 14.9024 6.68342 15.2929 6.29289Z'
            fill='currentColor'
          />
        </>
      ) : (
        <path
          d='M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
})

LogOutIcon.displayName = 'LogOutIcon'
