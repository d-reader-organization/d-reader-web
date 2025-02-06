import Image from 'next/image'
import { Text } from '@/components/ui'
import { ArrowLeftIcon } from '@/components/icons/theme/ArrowLeftIcon'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LINK, SUPPORT_EMAIL } from '@/constants/general'
import BunBunUnderConstruction from 'public/assets/images/site-under-construction.png'
import { RoutePath } from '@/enums/routePath'
import { DiscordIcon } from '@/components/icons/social/DiscordIcon'
import { InstagramIcon } from '@/components/icons/social/InstagramIcon'
import { TwitterIcon } from '@/components/icons/social/TwitterIcon'
import { MailIcon } from '@/components/icons/theme/MailIcon'
import { ButtonLink } from '../ui/ButtonLink'

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
          alt='Page not found'
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
        <div className='flex w-full justify-center gap-1 sm:gap-2 pt-1 pb-6'>
          <ButtonLink Icon={MailIcon} href={LINK.MAIL_TO_SUPPORT} solid>
            {SUPPORT_EMAIL}
          </ButtonLink>
          <ButtonLink Icon={TwitterIcon} iconOnly href={LINK.TWITTER} blank />
          <ButtonLink Icon={InstagramIcon} iconOnly href={LINK.INSTAGRAM} blank />
          <ButtonLink Icon={DiscordIcon} iconOnly href={LINK.DISCORD} blank />
        </div>
        <ButtonLink variant='ghost' Icon={ArrowLeftIcon} href={RoutePath.Home} className='border-b-1 rounded-none h-6'>
          Go back
        </ButtonLink>
      </div>
    </BaseLayout>
  )
}
