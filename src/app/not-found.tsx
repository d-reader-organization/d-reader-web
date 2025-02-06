import Image from 'next/image'
import { Text } from '@/components/ui'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LINK, SUPPORT_EMAIL } from '@/constants/general'
import RabbitHole from 'public/assets/images/rabbit-hole.png'
import { RoutePath } from '@/enums/routePath'
import { DiscordIcon } from '@/components/icons/social/DiscordIcon'
import { InstagramIcon } from '@/components/icons/social/InstagramIcon'
import { TwitterIcon } from '@/components/icons/social/TwitterIcon'
import { MailIcon } from '@/components/icons/theme/MailIcon'
import { ArrowLeftIcon } from '@/components/icons/theme/ArrowLeftIcon'
import { ButtonLink } from '@/components/ui/ButtonLink'

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
