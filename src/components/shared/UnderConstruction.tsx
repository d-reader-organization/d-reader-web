import Link from 'next/link'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { MoveLeft } from 'lucide-react'
import { IconLink } from '@/components/shared/IconLink'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LINK, SUPPORT_EMAIL } from '@/constants/general'
import BunBunUnderConstruction from 'public/assets/images/site-under-construction.png'
import { RoutePath } from '@/enums/routePath'
import { DiscordIcon } from '../icons/social/DiscordIcon'
import { InstagramIcon } from '../icons/social/InstagramIcon'
import { TwitterIcon } from '../icons/social/TwitterIcon'
import { MailInverseIcon } from '../icons/social/MailInverseIcon'

export default function UnderConstruction() {
  return (
    <BaseLayout>
      <div className='flex flex-col sm:w-[660px] justify-center items-center pt-2'>
        <Text
          as='h1'
          styleVariant='primary-heading'
          className='text-grey-400 uppercase text-center text-7xl leading-[62px] sm:text-7xl sm:leading-[62px] tracking-tight select-none'
        >
          WE&apos;RE
          <br />
          BUILDING
          <br />
          SOMETHING
          <br />
          GREAT!
        </Text>
        <Image
          src={BunBunUnderConstruction.src}
          alt='dReader Page not found'
          className='w-[214px] mr-4 -mt-16 h-auto pointer-events-none'
          width={400}
          height={430}
        />
        <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='medium'
          className='text-grey-100 text-center px-1 pt-3 sm:px-14 max-sm:text-xs sm:pt-4 md:px-20 mb-4'
        >
          This page is currently under construction, and we can&apos;t wait to show you what we&apos;ve been working on.
          Please check back later!
          <br />
          <br />
          In the meantime, feel free to reach out to us:
        </Text>
        <div className='flex w-full justify-center gap-1 sm:gap-2 text-grey-100 pt-1'>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl gap-2'
            href={LINK.MAIL_TO_SUPPORT}
            Icon={MailInverseIcon}
            blank
          >
            <MailInverseIcon className='w-[16.67px]' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
              {SUPPORT_EMAIL}
            </Text>
          </IconLink>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={LINK.TWITTER}
            Icon={TwitterIcon}
            iconClassName='w-4'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={LINK.INSTAGRAM}
            Icon={InstagramIcon}
            iconClassName='w-4'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={LINK.DISCORD}
            Icon={DiscordIcon}
            iconClassName='w-4'
            blank
          />
        </div>
        <Link
          className='flex items-center gap-1 pt-7 sm:pt-9 sm:gap-2 border-b-2 text-grey-100 border-grey-100'
          href={RoutePath.Home}
        >
          <MoveLeft size={16} />
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
            Go back
          </Text>
        </Link>
      </div>
    </BaseLayout>
  )
}
