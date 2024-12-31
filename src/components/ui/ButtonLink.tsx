import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { buttonVariants } from './Button'
import { type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

export interface ButtonLinkProps
  extends LinkProps,
  VariantProps<typeof buttonVariants>,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  icon?: LucideIcon
  iconOnly?: boolean
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
 * @param {LucideIcon} [props.icon] - An optional Lucide icon component
 * @param {boolean} [props.iconOnly] - Whether the link should only display an icon
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
 * import { Mail } from 'lucide-react';
 * <Link href="/contact" icon={Mail}>Contact Us</Link>
 */
const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    { className, variant, subVariant, size = 'md', iconPosition, icon: Icon, iconOnly, href, children, ...props },
    ref
  ) => {
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 18 : 20

    const linkContent = (
      <>
        {Icon && <Icon size={iconSize} className={cn('shrink-0')} />}
        {!iconOnly && children}
      </>
    )

    return (
      <Link
        className={cn(
          buttonVariants({ variant, subVariant, size, iconPosition, className }),
          iconOnly && 'min-w-9 px-0 py-0',
          iconOnly && (size === 'sm' ? 'size-9' : size === 'md' ? 'size-[42px]' : 'size-[52px]')
        )}
        ref={ref}
        href={href}
        {...props}
      >
        {linkContent}
      </Link>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export { ButtonLink }
