import { IconLink } from './IconLink'
import WebsiteIcon from 'public/assets/vector-icons/web-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  website: string
  instagram: string
  twitter: string
}

export const Socials: React.FC<Props> = ({ website, instagram, twitter, className }) => {
  if (website || instagram || twitter) {
    return (
      <div
        className={cn(
          'flex border border-grey-300 text-white rounded-xl bg-grey-600 bg-opacity-10 backdrop-blur-xl',
          className
        )}
      >
        <IconLink className='rounded-lg' href={website} Icon={WebsiteIcon} blank />
        <IconLink className='rounded-lg' href={instagram} Icon={InstagramIcon} blank />
        <IconLink className='rounded-lg' href={twitter} Icon={TwitterIcon} blank />
      </div>
    )
  }

  return null
}
