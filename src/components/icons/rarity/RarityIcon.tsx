import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const RarityIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    {...props}
    width='12'
    height='11'
    className={className}
    viewBox='0 0 12 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.36158 0.777248C2.59434 0.508143 2.91023 0.356934 3.23942 0.356934H8.76067C9.08987 0.356934 9.40575 0.508143 9.63851 0.777248C10.2632 1.49945 11.8788 3.36759 11.8788 3.36759C12.0404 3.55436 12.0404 3.8572 11.8788 4.04408L6.29257 10.5026C6.13102 10.6893 5.86907 10.6893 5.70743 10.5026L0.121161 4.04408C-0.0403862 3.85731 -0.0403862 3.55447 0.121161 3.36759L2.36158 0.777248ZM5.14286 3.46644H1.20578L3.23942 1.292L5.14286 3.46644Z'
      fill='currentColor'
    />
  </svg>
))

RarityIcon.displayName = 'RarityIcon'
