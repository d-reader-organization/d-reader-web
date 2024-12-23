import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  image: string
  gradientClassName?: string
  gradientDirectionClassName?: 'bg-gradient-to-b' | 'bg-gradient-to-t'
} & PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement>

export const ContentWithGradientImageBg: React.FC<Props> = ({
  children,
  className,
  gradientClassName,
  gradientDirectionClassName,
  image,
}) => (
  <div className={cn('relative h-full w-full overflow-hidden rounded-xl', className)}>
    <Image src={image} alt='bg image' className='object-cover' fill sizes='auto' />
    <div
      className={cn(
        'absolute inset-0 bg-gradient-to-b from-black to-transparent',
        gradientClassName,
        gradientDirectionClassName
      )}
    />
    <div className='relative z-10 h-full'>{children}</div>
  </div>
)
