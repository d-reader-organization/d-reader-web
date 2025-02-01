import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { VariantSvgIconProps } from '@/lib/types'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold rounded-md shadow-[0px_16px_32px_-4px_rgba(0,0,0,0.10),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-colors hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'text-black',
        secondary: 'text-grey-100',
        outline: '',
        white: 'text-black',
        ghost: 'w-full bg-transparent text-base font-medium leading-[22.4px] text-white h-min w-fit inline',
      },
      subVariant: {
        1: '',
        2: '',
        3: '',
      },
      size: {
        sm: 'h-9 min-w-[80px] text-xs py-0.5 px-2 sm:py-1 sm:px-4 rounded-lg gap-1',
        md: 'h-[42px] min-w-[100px] text-sm py-1 px-3 sm:py-2 sm:px-5 rounded-[10px] gap-2',
        lg: 'h-[52px] min-w-[110px] text-base py-2 px-4 sm:py-4 sm:px-6 rounded-xl gap-2',
      },
      iconPosition: {
        left: 'flex-row',
        right: 'flex-row-reverse',
      },
    },
    compoundVariants: [
      { variant: 'primary', subVariant: 1, className: 'bg-yellow-300 border-t border-yellow-100' },
      { variant: 'primary', subVariant: 2, className: 'bg-yellow-100 border-t border-yellow-50' },
      { variant: 'primary', subVariant: 3, className: 'bg-yellow-300 border-3 border-yellow-100' },
      {
        variant: 'secondary',
        subVariant: 1,
        className: 'bg-grey-300 bg-opacity-30 border-t border-white border-opacity-10',
      },
      {
        variant: 'secondary',
        subVariant: 2,
        className: 'bg-grey-300 bg-opacity-90 border-t border-white border-opacity-10',
      },
      {
        variant: 'secondary',
        subVariant: 3,
        className: 'bg-grey-300 bg-opacity-30 border-3 border-white border-opacity-10',
      },
      { variant: 'outline', subVariant: 1, className: 'bg-transparent border border-grey-300 text-grey-100' },
      { variant: 'outline', subVariant: 2, className: 'bg-white bg-opacity-[0.08] border border-white text-white' },
      { variant: 'outline', subVariant: 3, className: 'bg-transparent border-3 border-grey-300 text-grey-100' },
      { variant: 'white', subVariant: 1, className: 'bg-white border-b border-grey-100' },
      { variant: 'white', subVariant: 2, className: 'bg-grey-100 border-t border-white border-opacity-10' },
      { variant: 'white', subVariant: 3, className: 'bg-white border-3 border-[#E0E0E0]' },
    ],
    defaultVariants: {
      variant: 'primary',
      subVariant: 1,
      size: 'md',
      iconPosition: 'left',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconOnly?: boolean
  Icon?: React.FC<VariantSvgIconProps>
  iconClassname?: string
}

/**
 * Button component with various style variants and icon support.
 *
 * @component
 * @param {Object} props - The properties that define the button's behavior and appearance.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {'primary' | 'secondary' | 'outline' | 'white'} [props.variant='primary'] - The main style variant of the button.
 * @param {1 | 2 | 3} [props.subVariant=1] - The sub-variant of the chosen main variant.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {'left' | 'right'} [props.iconPosition='left'] - The position of the icon relative to the text.
 * @param {Icon} [props.icon] - An optional icon component.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With variant and subVariant
 * <Button variant="primary" subVariant={2}>Primary Button</Button>
 *
 * @example
 * // With icon
 * import { Mail } from 'lucide-react';
 * <Button Icon={Mail}>Send Email</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, iconClassname, variant, subVariant, size = 'md', iconPosition, Icon, iconOnly, children, ...props },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-[18px] h-[18px]' : 'w-5 h-5'

    if (iconOnly && Icon) {
      return (
        <button
          className={cn(
            buttonVariants({ variant, subVariant, size, iconPosition, className }),
            'min-w-9 px-0 py-0',
            size === 'sm' ? 'size-9' : size === 'md' ? 'size-[42px]' : 'size-[52px]'
          )}
          ref={ref}
          {...props}
        >
          <Icon className={cn(iconSize, iconClassname, 'shrink-0')} />
        </button>
      )
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, subVariant, size, iconPosition, className }),
          variant === 'ghost' ? 'px-0 sm:px-0 py-0 sm:py-0' : ''
        )}
        ref={ref}
        {...props}
      >
        {Icon && <Icon className={cn(iconSize, iconClassname, 'shrink-0')} />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
