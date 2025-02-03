import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const DigitalArtIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className, ...props }, ref) => (
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
      d='M1.96798 1.06462C2.16195 0.840363 2.42519 0.714355 2.69952 0.714355H7.30056C7.57489 0.714355 7.83812 0.840363 8.03209 1.06462C8.55265 1.66645 9.89903 3.22323 9.89903 3.22323C10.0337 3.37888 10.0337 3.63125 9.89903 3.78698L5.24381 9.16905C5.10918 9.32469 4.8909 9.32469 4.75619 9.16905L0.100966 3.78698C-0.0336552 3.63134 -0.0336552 3.37897 0.100966 3.22323L1.96798 1.06462ZM4.28571 3.30561H1.00482L2.69952 1.49358L4.28571 3.30561Z'
      fill='currentColor'
    />
  </svg>
))

DigitalArtIcon.displayName = 'DigitalArtIcon'
