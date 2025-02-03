import React from 'react'
import { Text } from '../ui'
import Link from 'next/link'
import { Divider } from '../shared/Divider'
import { RoutePath } from '@/enums/routePath'
import { LINK } from '@/constants/general'
import { SoonTag } from '../shared/Tags'
import { cn } from '@/lib/utils'
import { ESSENTIAL_LINKS, MAIN_LINKS, NavigationLink, SOCIAL_LINKS } from '@/constants/navigationLinks'
import { LogoSymbolIcon } from '../icons/logo/LogoSymbolIcon'
import { GooglePlayIcon } from '../icons/platform/GooglePlayIcon'
import { AppStoreIcon } from '../icons/platform/AppStoreIcon'

export const Footer: React.FC = () => (
  <div className='bg-black min-h-[220px] h-full flex justify-center items-center'>
    <div className='flex flex-col justify-end gap-6 md:gap-8 max-w-screen-xl w-full p-4'>
      <div className='flex max-md:flex-wrap max-md:gap-8 items-start justify-between w-full mt-8'>
        <FooterColumn links={ESSENTIAL_LINKS} title='Essentials' />
        <FooterColumn links={MAIN_LINKS} title='Links' />
        <FooterColumn links={SOCIAL_LINKS} title='Rabbithole' />
        <MobileAppsColumn />
      </div>
      <Divider className='md:mt-8 bg-grey-400' />
      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-16'>
        <LogoSymbolIcon className='text-grey-200 w-4 h-auto' />
        <Text as='span' className='text-grey-200' styleVariant='body-normal'>
          &#169; Decentralized Reader, ltd
        </Text>
        <div>
          <Link href={RoutePath.TermsOfService} target='_blank'>
            <Text as='span' className='text-grey-200 hover:text-white' styleVariant='body-normal'>
              Terms
            </Text>
          </Link>
          <Text as='span' className='text-grey-200 hover:text-white mx-2' styleVariant='body-normal'>
            |
          </Text>
          <Link href={RoutePath.PrivacyPolicy} target='_blank'>
            <Text as='span' className='text-grey-200 hover:text-white' styleVariant='body-normal'>
              Privacy Policy
            </Text>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

type ColumnProps = {
  links: NavigationLink[]
  title: string
}

const FooterColumn: React.FC<ColumnProps> = ({ links, title }) => (
  <div className='flex flex-col gap-6'>
    <Text as='h4' styleVariant='secondary-heading'>
      {title}
    </Text>
    <div className='flex flex-col gap-4'>
      {links.map((link, index) => {
        return (
          <Link
            className={cn('flex gap-1', link.disabled ? 'pointer-events-none text-grey-300' : 'text-grey-100')}
            href={link.href}
            key={`${link.name}-${index}`}
            prefetch={false}
            target={link.targetBlank ? '_blank' : undefined}
          >
            <Text
              as='span'
              styleVariant='body-normal'
              fontWeight='medium'
              className={link.disabled ? '' : 'font-normal'}
            >
              {link.name}
            </Text>
            {link.isComingSoon && <SoonTag className='bg-grey-300' />}
          </Link>
        )
      })}
    </div>
  </div>
)

const MobileAppsColumn: React.FC = () => (
  <div className='flex flex-col gap-8 max-w-80'>
    <Text as='h4' styleVariant='secondary-heading'>
      Get the most out of dReader with a mobile app!
    </Text>
    <div className='flex items-center gap-4'>
      <Link href={LINK.GOOGLE_PLAY} target='_blank'>
        <GooglePlayIcon className='h-10' />
      </Link>
      <div className='flex flex-col items-center relative'>
        <SoonTag className='absolute z-10 -top-3.5 bg-grey-100' />
        <AppStoreIcon className='flex opacity-40 h-10' />
      </div>
    </div>
  </div>
)
