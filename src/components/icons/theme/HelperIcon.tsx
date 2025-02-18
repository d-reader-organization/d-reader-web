import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const HelperIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill={solid ? 'currentColor' : 'none'}
    >
      {solid ? (
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.55969 6.75C7.73602 6.24875 8.08405 5.82608 8.54215 5.55685C9.00026 5.28762 9.53886 5.1892 10.0626 5.27903C10.5863 5.36886 11.0613 5.64114 11.4035 6.04765C11.7457 6.45415 11.933 6.96864 11.9322 7.5C11.9322 9 9.68219 9.75 9.68219 9.75M9.74219 12.75H9.74969M17.2422 9C17.2422 13.1421 13.8843 16.5 9.74219 16.5C5.60005 16.5 2.24219 13.1421 2.24219 9C2.24219 4.85786 5.60005 1.5 9.74219 1.5C13.8843 1.5 17.2422 4.85786 17.2422 9Z'
          fill='currentColor'
        />
      ) : (
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.55969 6.75C7.73602 6.24875 8.08405 5.82608 8.54215 5.55685C9.00026 5.28762 9.53886 5.1892 10.0626 5.27903C10.5863 5.36886 11.0613 5.64114 11.4035 6.04765C11.7457 6.45415 11.933 6.96864 11.9322 7.5C11.9322 9 9.68219 9.75 9.68219 9.75M9.74219 12.75H9.74969M17.2422 9C17.2422 13.1421 13.8843 16.5 9.74219 16.5C5.60005 16.5 2.24219 13.1421 2.24219 9C2.24219 4.85786 5.60005 1.5 9.74219 1.5C13.8843 1.5 17.2422 4.85786 17.2422 9Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  )
})

HelperIcon.displayName = 'HelperIcon'
