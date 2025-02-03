import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const LogoSymbolIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <svg ref={ref} {...props} viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M13.5466 0C12.4679 0 11.5944 0.871534 11.5944 1.94502V6.57317C11.5087 6.56836 7.82746 6.56475 7.82746 6.56475V1.94502C7.82746 0.871534 6.9527 0 5.87524 0C4.79778 0 3.92302 0.871534 3.92302 1.94502V6.64289C1.97201 7.02036 0.5 8.72976 0.5 10.783C0.5 13.1127 2.39551 15 4.73263 15H11.3349C13.6733 15 15.4952 13.1115 15.4952 10.783C15.4952 10.5233 15.5 1.94502 15.5 1.94502C15.5 0.870332 14.6252 0 13.5478 0L13.5466 0ZM5.52051 10.9861H3.5152C3.08084 10.9861 2.72973 10.6351 2.72973 10.2036C2.72973 9.772 3.08205 9.42098 3.5152 9.42098H5.52051C5.95487 9.42098 6.30598 9.772 6.30598 10.2036C6.30598 10.6351 5.95367 10.9861 5.52051 10.9861ZM10.9995 10.9861H8.99421C8.55985 10.9861 8.20874 10.6351 8.20874 10.2036C8.20874 9.772 8.56105 9.42098 8.99421 9.42098H10.9995C11.4339 9.42098 11.785 9.772 11.785 10.2036C11.785 10.6351 11.4327 10.9861 10.9995 10.9861Z'
      fill='currentColor'
    />
  </svg>
))

LogoSymbolIcon.displayName = 'LogoSymbolIcon'
