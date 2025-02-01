import Link from 'next/link'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { IconLink } from '@/components/shared/IconLink'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LINK, SUPPORT_EMAIL } from '@/constants/general'
import RabbitHole from 'public/assets/images/rabbit-hole.png'
import { RoutePath } from '@/enums/routePath'
import { DiscordIcon } from '@/components/icons/social/DiscordIcon'
import { InstagramIcon } from '@/components/icons/social/InstagramIcon'
import { TwitterIcon } from '@/components/icons/social/TwitterIcon'
import { MailInverseIcon } from '@/components/icons/social/MailInverseIcon'
import { ArrowLeftIcon } from '@/components/icons/theme/ArrowLeftIcon'

export default function NotFound() {
  return (
    <BaseLayout>
      <div className='flex flex-col sm:w-[660px] justify-center items-center pt-2'>
        <Text
          as='h1'
          styleVariant='primary-heading'
          className='text-grey-400 uppercase text-center text-7xl leading-[62px] sm:text-7xl sm:leading-[62px] tracking-tight select-none'
        >
          YOU&apos;VE
          <br />
          FOUND THE
          <br />
          RABBIT HOLE
        </Text>
        <Image
          src={RabbitHole.src}
          alt=''
          className='w-[180px] mr-4 -mt-10 h-auto pointer-events-none'
          width={400}
          height={254}
        />
        <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='medium'
          className='text-grey-100 text-center px-1 pt-3 sm:px-14 max-sm:text-xs sm:pt-4 md:px-20 mb-4'
        >
          You&apos;ve dug too deep and fell into a rabbit hole.
          <br />
          There is nothing significant inside but at least it&apos;s cozy.
        </Text>
        <div className='flex w-full justify-center gap-1 pt-1 sm:gap-2 text-grey-100'>
          <IconLink className='bg-grey-500 rounded-lg sm:rounded-xl gap-2' href={LINK.MAIL_TO_SUPPORT} blank>
            <MailInverseIcon className='w-[16.67px]' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
              {SUPPORT_EMAIL}
            </Text>
          </IconLink>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={LINK.TWITTER}
            Icon={TwitterIcon}
            iconClassName='w-[13.09px]'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={LINK.INSTAGRAM}
            Icon={InstagramIcon}
            iconClassName='w-[14px]'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={LINK.DISCORD}
            Icon={DiscordIcon}
            iconClassName='w-[16px]'
            blank
          />
        </div>
        <Link
          className='flex items-center gap-1 pt-7 sm:pt-9 sm:gap-2 border-b-2 text-grey-100 border-grey-100'
          href={RoutePath.Home}
        >
          <ArrowLeftIcon className='w-5 h-5' />
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
            Go back
          </Text>
        </Link>
      </div>
    </BaseLayout>
  )
}
