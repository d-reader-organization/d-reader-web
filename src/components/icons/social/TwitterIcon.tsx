import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const TwitterIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className }, ref) => (
  <svg ref={ref} className={className} viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.24543 6.99485L14.1188 1.45459H12.964L8.73242 6.26512L5.35268 1.45459H1.45456L6.56538 8.72896L1.45456 14.5388H2.60946L7.0781 9.45869L10.6473 14.5388H14.5455L9.24514 6.99485H9.24543ZM7.66363 8.79305L7.1458 8.06869L3.02559 2.30485H4.79945L8.12451 6.95645L8.64234 7.68082L12.9645 13.7272H11.1907L7.66363 8.79333V8.79305Z'
      fill='currentColor'
    />
  </svg>
))

TwitterIcon.displayName = 'TwitterIcon'
