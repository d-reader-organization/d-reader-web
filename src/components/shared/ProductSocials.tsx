import React from 'react'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import { LINK } from '@/constants/general'
import { IconLink } from './IconLink'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center text-grey-200'>
    <IconLink href={LINK.TWITTER} Icon={TwitterIcon} blank />
    <IconLink href={LINK.INSTAGRAM} Icon={InstagramIcon} blank />
    <IconLink href={LINK.DISCORD} Icon={DiscordIcon} blank />
  </div>
)
