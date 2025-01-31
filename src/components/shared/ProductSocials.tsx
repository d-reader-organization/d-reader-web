import React from 'react'
import { LINK } from '@/constants/general'
import { IconLink } from './IconLink'
import { DiscordIcon } from '../icons/social/DiscordIcon'
import { InstagramIcon } from '../icons/social/InstagramIcon'
import { TwitterIcon } from '../icons/social/TwitterIcon'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center text-grey-200'>
    <IconLink href={LINK.TWITTER} Icon={TwitterIcon} blank />
    <IconLink href={LINK.INSTAGRAM} Icon={InstagramIcon} blank />
    <IconLink href={LINK.DISCORD} Icon={DiscordIcon} blank />
  </div>
)
