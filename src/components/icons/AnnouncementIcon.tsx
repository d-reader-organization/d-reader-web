import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const AnnouncementIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className }, ref) => (
  <svg ref={ref} className={className} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M16.958 14.6667C18.7299 14.6667 20.1663 11.999 20.1663 8.70833C20.1663 5.41764 18.7299 2.75 16.958 2.75M16.958 14.6667C15.1861 14.6667 13.7497 11.999 13.7497 8.70833C13.7497 5.41764 15.1861 2.75 16.958 2.75M16.958 14.6667L4.98959 12.4906C4.13939 12.336 3.71429 12.2587 3.37056 12.0899C2.67127 11.7464 2.1505 11.1224 1.93764 10.3729C1.83301 10.0045 1.83301 9.57247 1.83301 8.70833C1.83301 7.84419 1.83301 7.41212 1.93764 7.04373C2.1505 6.29428 2.67127 5.67029 3.37056 5.32679C3.71429 5.15795 4.13939 5.08066 4.98959 4.92608L16.958 2.75M4.58301 12.8333L4.94404 17.8878C4.97833 18.3678 4.99547 18.6078 5.09989 18.7897C5.19183 18.9499 5.32999 19.0785 5.49627 19.1588C5.68514 19.25 5.92575 19.25 6.40698 19.25H8.04085C8.59099 19.25 8.86605 19.25 9.06964 19.1403C9.24853 19.0439 9.39032 18.8908 9.47272 18.705C9.56649 18.4936 9.54539 18.2194 9.5032 17.6708L9.16634 13.2917'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
))

AnnouncementIcon.displayName = 'AnnouncementIcon'
