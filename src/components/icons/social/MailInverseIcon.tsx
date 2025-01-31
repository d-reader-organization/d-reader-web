import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const MailInverseIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    {...props}
    className={className}
    viewBox='0 0 18 16'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='MailIconInverse'>
      <path
        id='Message_2'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.1162 0.541382C14.2337 0.541382 15.3087 0.983048 16.0995 1.77555C16.8912 2.56638 17.3337 3.63305 17.3337 4.74972V11.333C17.3337 13.658 15.442 15.5414 13.1162 15.5414H4.88366C2.55783 15.5414 0.666992 13.658 0.666992 11.333V4.74972C0.666992 2.42472 2.54949 0.541382 4.88366 0.541382H13.1162ZM14.4419 5.99145L14.5086 5.92479C14.7078 5.68312 14.7078 5.33312 14.4994 5.09145C14.3836 4.96729 14.2244 4.89145 14.0586 4.87479C13.8836 4.86562 13.7169 4.92479 13.5911 5.04145L9.8336 8.04145C9.35027 8.44229 8.65777 8.44229 8.16693 8.04145L4.41693 5.04145C4.15777 4.84979 3.79943 4.87479 3.5836 5.09979C3.3586 5.32479 3.3336 5.68312 3.52443 5.93312L3.6336 6.04145L7.42527 8.99979C7.89193 9.36645 8.45777 9.56645 9.05027 9.56645C9.6411 9.56645 10.2169 9.36645 10.6828 8.99979L14.4419 5.99145Z'
        fill='currentColor'
      />
    </g>
  </svg>
))

MailInverseIcon.displayName = 'MailInverseIcon'
