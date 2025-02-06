import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { buttonVariants } from './Button'
import { type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { VariantSvgIconProps } from '@/lib/types'

export interface ButtonLinkProps
  extends LinkProps,
    VariantProps<typeof buttonVariants>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  Icon?: React.FC<VariantSvgIconProps>
  iconOnly?: boolean
  iconClassName?: string
  iconPosition?: 'left' | 'right'
  solid?: boolean
  blank?: boolean
}

/**
 * Custom Link component that combines Next.js Link functionality with Button styling
 *
 * @component
 * @param {Object} props - The properties that define the link's behavior and appearance
 * @param {React.ReactNode} props.children - The content of the link
 * @param {'primary' | 'secondary' | 'outline' | 'white'} [props.variant='primary'] - The main style variant of the link
 * @param {1 | 2 | 3} [props.subVariant=1] - The sub-variant of the chosen main variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the link
 * @param {'left' | 'right'} [props.iconPosition='left'] - The position of the icon relative to the text
 * @param {Icon} [props.icon] - An optional icon component.
 * @param {string} props.href - The URL to navigate to when the link is clicked
 *
 * @example
 * // Basic usage
 * <Link href="/about">About Us</Link>
 *
 * @example
 * // With variant and subVariant
 * <Link href="/contact" variant="primary" subVariant={2}>Contact Us</Link>
 *
 * @example
 * // With icon
 * import { MailIcon } from '@/components/icons/MailIcon';
 * <Link href="/contact" Icon={MailIcon}>Contact Us</Link>
 */
const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      className,
      variant = 'secondary',
      subVariant,
      size = 'md',
      Icon,
      iconPosition = 'left',
      iconClassName,
      iconOnly,
      solid = true,
      blank = false,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 'size-4' : size === 'md' ? 'size-4.5' : 'size-5'

    return (
      <Link
        className={cn(
          buttonVariants({ variant, subVariant, size }),
          variant === 'ghost' || iconOnly ? 'px-0 sm:px-0 py-0 sm:py-0' : '',
          className
        )}
        target={blank ? '_blank' : undefined}
        ref={ref}
        href={href}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className={cn(iconSize, iconClassName, 'shrink-0')} solid={solid} />}
        {!iconOnly && children}
        {Icon && iconPosition === 'right' && <Icon className={cn(iconSize, iconClassName, 'shrink-0')} solid={solid} />}
      </Link>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export { ButtonLink }
