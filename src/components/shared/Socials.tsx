import React from 'react'
import { cn } from '@/lib/utils'
import { InstagramIcon } from '@/components/icons/social/InstagramIcon'
import { TwitterIcon } from '@/components/icons/social/TwitterIcon'
import { GlobeIcon } from '@/components/icons/social/GlobeIcon'
import { ButtonLink } from '@/components/ui/ButtonLink'

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
        <ButtonLink variant='ghost' className='shadow-none' Icon={GlobeIcon} iconOnly href={website} blank />
        <ButtonLink variant='ghost' className='shadow-none' Icon={InstagramIcon} iconOnly href={instagram} blank />
        <ButtonLink variant='ghost' className='shadow-none' Icon={TwitterIcon} iconOnly href={twitter} blank />
      </div>
    )
  }

  return null
}
