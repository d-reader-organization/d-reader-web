'use client'

import Link, { LinkProps } from 'next/link'
import { Text, Variant } from '../ui/Text'
import { cn } from '@/lib/utils'
import { SoonTag } from '../shared/Tags'
import { usePathname } from 'next/navigation'

export type NavigationLinkProps = {
  href: string
  activeColor?: string
  isComingSoon?: boolean
  disabled?: boolean
  as?: Variant
  title: string
} & LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>

export const NavigationItem: React.FC<NavigationLinkProps> = ({
  href,
  title,
  activeColor = 'text-yellow-300',
  as = 'h4',
  isComingSoon = false,
  disabled = false,
  className,
  ...props
}) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      className={cn(
        'flex items-center gap-1 text-base font-bold leading-[22.4px] text-grey-100',
        isActive && activeColor,
        disabled ? 'text-grey-300' : 'hover:text-white',
        className
      )}
      href={disabled ? '#' : href}
      prefetch={false}
      {...props}
    >
      <Text as={as} styleVariant='secondary-heading'>
        {title}
      </Text>
      {isComingSoon && <SoonTag />}
    </Link>
  )
}
