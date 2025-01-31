import { IconLink } from './IconLink'
import { cn } from '@/lib/utils'
import React from 'react'
import { InstagramIcon } from '../icons/social/InstagramIcon'
import { TwitterIcon } from '../icons/social/TwitterIcon'
import { GlobeIcon } from 'lucide-react'

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
        <IconLink className='rounded-lg' href={website} Icon={GlobeIcon} blank />
        <IconLink className='rounded-lg' href={instagram} Icon={InstagramIcon} blank />
        <IconLink className='rounded-lg' href={twitter} Icon={TwitterIcon} blank />
      </div>
    )
  }

  return null
}
