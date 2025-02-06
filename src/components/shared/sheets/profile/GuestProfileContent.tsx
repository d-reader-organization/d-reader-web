import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { ProductSocials } from '../../ProductSocials'
import { ContentWithGradientImageBg } from '../../ContentWithGradientImageBg'
import { SignInOrRegisterLinkButton } from '../../buttons/SignInOrRegisterLinkButton'
import BunbunBanner from 'public/assets/images/bunbun_yg4h.jpg'
import { WalletSection } from './WalletSection'
import { usePathname } from 'next/navigation'
import { withRedirect } from '@/lib/utils'

// TODO: Profile sheet styles are outdated, and we want to show the WalletSection only on the mint/comic-issue page?
export const GuestProfileContent: React.FC = () => (
  <div className='flex flex-col justify-between gap-6 h-full'>
    <div className='mt-10'>
      <WalletSection />
    </div>
    <BannerWidget />
    <ProductSocials />
  </div>
)

const BannerWidget: React.FC = () => {
  const pathname = usePathname()
  const href = withRedirect(RoutePath.Login, pathname)

  return (
    <ContentWithGradientImageBg className='p-4' image={BunbunBanner.src}>
      <div className='flex flex-col justify-between h-full'>
        <div className='text-2xl leading-[28.8px] font-medium'>
          <span className='font-bold'>Sign in</span>
          <span> and get up to </span>
          <span className='font-bold'>30% OFF </span>
          <span>on all comics!</span>
        </div>
        <SignInOrRegisterLinkButton href={href} />
      </div>
    </ContentWithGradientImageBg>
  )
}
