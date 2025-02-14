import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const SadFaceIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 26'
      fill={solid ? 'currentColor' : 'none'}
    >
      {solid ? (
        <path
          d='M14.7422 15C14.7422 15 13.2422 13 10.7422 13C8.24219 13 6.74219 15 6.74219 15M15.7422 8.24C15.3472 8.725 14.8072 9 14.2422 9C13.6772 9 13.1522 8.725 12.7422 8.24M8.74219 8.24C8.34719 8.725 7.80719 9 7.24219 9C6.67719 9 6.15219 8.725 5.74219 8.24M20.7422 11C20.7422 16.5228 16.265 21 10.7422 21C5.21934 21 0.742188 16.5228 0.742188 11C0.742188 5.47715 5.21934 1 10.7422 1C16.265 1 20.7422 5.47715 20.7422 11Z'
          fillRule='evenodd'
          clipRule='evenodd'
        />
      ) : (
        <path
          stroke='currentColor'
          strokeWidth='2'
          d='M14.7422 15C14.7422 15 13.2422 13 10.7422 13C8.24219 13 6.74219 15 6.74219 15M15.7422 8.24C15.3472 8.725 14.8072 9 14.2422 9C13.6772 9 13.1522 8.725 12.7422 8.24M8.74219 8.24C8.34719 8.725 7.80719 9 7.24219 9C6.67719 9 6.15219 8.725 5.74219 8.24M20.7422 11C20.7422 16.5228 16.265 21 10.7422 21C5.21934 21 0.742188 16.5228 0.742188 11C0.742188 5.47715 5.21934 1 10.7422 1C16.265 1 20.7422 5.47715 20.7422 11Z'
          fillRule='evenodd'
          clipRule='evenodd'
        />
      )}
    </svg>
  )
})

SadFaceIcon.displayName = 'SadFaceIcon'
