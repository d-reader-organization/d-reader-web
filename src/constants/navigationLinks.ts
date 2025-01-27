import { RoutePath } from '@/enums/routePath'
import { LINK } from './general'

export type NavigationLink = {
  isComingSoon: boolean
  disabled: boolean
  targetBlank: boolean
  href: string
  name: string
}

export const ESSENTIAL_LINKS: NavigationLink[] = [
  { href: '/', name: 'Home', isComingSoon: false, disabled: false, targetBlank: false },
  { href: RoutePath.Discover, name: 'Discover', isComingSoon: false, disabled: false, targetBlank: false },
  { href: RoutePath.Marketplace, name: 'Marketplace', isComingSoon: true, disabled: false, targetBlank: false },
  { href: RoutePath.Invest, name: 'Invest', isComingSoon: true, disabled: false, targetBlank: false },
]

export const MAIN_LINKS: NavigationLink[] = [
  { href: LINK.MAIL_TO_SUPPORT, name: 'Help center', isComingSoon: false, disabled: false, targetBlank: true },
  { href: RoutePath.FAQ, name: 'FAQ', isComingSoon: false, disabled: false, targetBlank: false },
  { href: LINK.LINKTREE, name: 'Linktree', isComingSoon: false, disabled: false, targetBlank: true },
  { href: LINK.D_PUBLISHER, name: 'Publish a comic', isComingSoon: false, disabled: false, targetBlank: true },
]

export const SOCIAL_LINKS: NavigationLink[] = [
  { href: LINK.TWITTER, name: '𝕏 / Twitter', isComingSoon: false, disabled: false, targetBlank: true },
  { href: LINK.DISCORD, name: 'Discord', isComingSoon: false, disabled: false, targetBlank: true },
  { href: LINK.INSTAGRAM, name: 'Instagram', isComingSoon: false, disabled: false, targetBlank: true },
  { href: LINK.TENSOR, name: 'Trade on Tensor', isComingSoon: false, disabled: false, targetBlank: true },
]
