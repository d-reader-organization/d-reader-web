import React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { ASPECT_RATIO } from '@/constants/general'

export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarImageProps extends Omit<ImageProps, 'alt'> {
  size?: AvatarSize
  alt?: ImageProps['alt']
  className?: string
}

const sizeVariants: Record<AvatarSize, string> = {
  small: 'w-[42px] h-[42px]',
  medium: 'w-12 h-12',
  large: 'w-14 h-14',
}

/** TODO: user this AvatarImage component or from Shadcn? Look into all <AvatarImage /> uses */
export const AvatarImage: React.FC<AvatarImageProps> = ({ size = 'medium', alt = '', className, ...props }) => {
  return (
    <Image
      alt={alt}
      {...ASPECT_RATIO.CREATOR_AVATAR}
      className={cn('border-2 border-grey-500 bg-grey-600 rounded-full', sizeVariants[size], className)}
      {...props}
    />
  )
}
