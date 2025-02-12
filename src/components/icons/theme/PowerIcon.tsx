import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const PowerIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
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
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.0001 1C12.5524 1 13.0001 1.44772 13.0001 2V12C13.0001 12.5523 12.5524 13 12.0001 13C11.4478 13 11.0001 12.5523 11.0001 12V2C11.0001 1.44772 11.4478 1 12.0001 1Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.33711 5.93278C6.7277 6.32324 6.7278 6.9564 6.33734 7.34699C5.21879 8.46592 4.45712 9.89138 4.14865 11.4432C3.84018 12.9949 3.99876 14.6033 4.60434 16.065C5.20991 17.5266 6.23529 18.7759 7.55083 19.6549C8.86637 20.5338 10.413 21.0029 11.9951 21.0029C13.5773 21.0029 15.1239 20.5338 16.4394 19.6549C17.7549 18.7759 18.7803 17.5266 19.3859 16.065C19.9915 14.6033 20.1501 12.9949 19.8416 11.4432C19.5331 9.89138 18.7715 8.46592 17.6529 7.34699C17.2624 6.9564 17.2625 6.32324 17.6531 5.93278C18.0437 5.54232 18.6769 5.54242 19.0673 5.93301C20.4655 7.33166 21.4176 9.1135 21.8032 11.0532C22.1888 12.9929 21.9906 15.0034 21.2336 16.8305C20.4766 18.6576 19.1949 20.2192 17.5505 21.3178C15.9061 22.4165 13.9728 23.0029 11.9951 23.0029C10.0174 23.0029 8.08418 22.4165 6.43976 21.3178C4.79534 20.2192 3.51361 18.6576 2.75664 16.8305C1.99967 15.0034 1.80144 12.9929 2.18703 11.0532C2.57262 9.1135 3.5247 7.33166 4.9229 5.93301C5.31336 5.54242 5.94653 5.54232 6.33711 5.93278Z'
            fill='currentColor'
          />
        </>
      ) : (
        <path
          d='M12.0001 2V12M18.3601 6.64C19.6185 7.89879 20.4754 9.50244 20.8224 11.2482C21.1694 12.9939 20.991 14.8034 20.3098 16.4478C19.6285 18.0921 18.4749 19.4976 16.9949 20.4864C15.515 21.4752 13.775 22.0029 11.9951 22.0029C10.2152 22.0029 8.47527 21.4752 6.99529 20.4864C5.51532 19.4976 4.36176 18.0921 3.68049 16.4478C2.99921 14.8034 2.82081 12.9939 3.16784 11.2482C3.51487 9.50244 4.37174 7.89879 5.63012 6.64'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
})

PowerIcon.displayName = 'PowerIcon'
