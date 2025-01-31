import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const BookmarkIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className, ...props }, ref) => (
  <svg ref={ref} {...props} className={className} viewBox='0 0 19 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g id='BookmarkIcon'>
      <path
        id='Subtract'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.9964 2.875H7.78119C5.93659 2.875 4.43359 3.606 4.43359 5.46426V15.835C4.43359 16.2175 4.74103 16.5318 5.12361 16.5318C5.23975 16.5318 5.35657 16.497 5.45837 16.443L9.89222 14.2295L14.3192 16.443C14.4832 16.5386 14.6813 16.566 14.859 16.5113C15.0434 16.4567 15.1937 16.3337 15.2825 16.1697C15.3372 16.0672 15.3645 15.9511 15.3645 15.835V5.46426C15.344 3.606 13.8478 2.875 11.9964 2.875ZM7.67666 11.2461C7.44479 11.0142 7.44479 10.6382 7.67666 10.4064L9.05943 9.02361L7.67653 7.64072C7.44466 7.40884 7.44466 7.0329 7.67653 6.80103C7.90841 6.56916 8.28435 6.56916 8.51622 6.80103L9.89911 8.18392L11.2819 6.80115C11.5138 6.56927 11.8897 6.56927 12.1216 6.80115C12.3535 7.03302 12.3535 7.40896 12.1216 7.64084L10.7388 9.02361L12.1214 10.4063C12.3533 10.6381 12.3533 11.0141 12.1214 11.2459C11.8896 11.4778 11.5136 11.4778 11.2818 11.2459L9.89911 9.8633L8.51635 11.2461C8.28448 11.4779 7.90854 11.4779 7.67666 11.2461Z'
        fill='currentColor'
      />
    </g>
  </svg>
))

BookmarkIcon.displayName = 'BookmarkIcon'
