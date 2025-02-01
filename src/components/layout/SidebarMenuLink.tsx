import Link from 'next/link'
import { Text, Variant } from '../ui/Text'
import { cn } from '@/lib/utils'
import React from 'react'
import { SidebarMenuButton } from '../ui/sidebar'
import { VariantSvgIconProps } from '@/lib/types'

export type NavigationLinkProps = {
  href: string
  activeColor?: string
  isComingSoon?: boolean
  disabled?: boolean
  as?: Variant
  title: string
  isActive: boolean
  Icon: React.FC<VariantSvgIconProps>
}

export const SidebarMenuLink: React.FC<NavigationLinkProps> = ({ href, isActive, title, disabled = false, Icon }) => {
  return (
    <SidebarMenuButton asChild>
      <Link
        className={cn(
          'flex flex-row text-grey-100 hover:bg-grey-600 hover:text-white',
          isActive && 'bg-grey-600 text-white',
          disabled ? 'text-grey-300' : 'hover:text-white'
        )}
        href={disabled ? '#' : href}
      >
        <Icon solid={isActive} className='h-5 w-5' />
        <Text styleVariant='body-normal' fontWeight='medium' as='span'>
          {title}
        </Text>
      </Link>
    </SidebarMenuButton>
  )
}
