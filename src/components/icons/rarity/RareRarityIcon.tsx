import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const RareRarityIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    {...props}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 10 10'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.96798 1.0645C2.16195 0.840241 2.42519 0.714233 2.69952 0.714233H7.30056C7.57489 0.714233 7.83812 0.840241 8.03209 1.0645C8.55265 1.66633 9.89903 3.22311 9.89903 3.22311C10.0337 3.37875 10.0337 3.63112 9.89903 3.78686L5.24381 9.16893C5.10918 9.32457 4.8909 9.32457 4.75619 9.16893L0.100966 3.78686C-0.0336552 3.63122 -0.0336552 3.37884 0.100966 3.22311L1.96798 1.0645ZM4.28571 3.30549H1.00482L2.69952 1.49345L4.28571 3.30549Z'
      fill='#3926B4'
    />
  </svg>
))

RareRarityIcon.displayName = 'RareRarityIcon'
