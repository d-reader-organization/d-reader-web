import React from 'react'
import { LINK } from '@/constants/general'
import { DiscordIcon } from '../icons/social/DiscordIcon'
import { InstagramIcon } from '../icons/social/InstagramIcon'
import { TwitterIcon } from '../icons/social/TwitterIcon'
import { ButtonLink } from '../ui/ButtonLink'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center text-grey-200'>
    <ButtonLink variant='ghost' Icon={TwitterIcon} iconOnly href={LINK.TWITTER} blank />
    <ButtonLink variant='ghost' Icon={InstagramIcon} iconOnly href={LINK.INSTAGRAM} blank />
    <ButtonLink variant='ghost' Icon={DiscordIcon} iconOnly href={LINK.DISCORD} blank />
  </div>
)
