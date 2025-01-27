'use client'

import React, { RefObject, useState } from 'react'
import { cn } from '@/lib/utils'
import { Text, TextProps, TextRef } from './Text'

const createRefForVariant = (variant: TextProps['as']): RefObject<TextRef | null> => {
  switch (variant) {
    case 'span':
      return React.createRef<HTMLSpanElement>()
    case 'p':
      return React.createRef<HTMLParagraphElement>()
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return React.createRef<HTMLHeadingElement>()
    default:
      throw new Error('Unsupported variant: ' + variant)
  }
}

export const TextWithOverflow: React.FC<TextProps> = ({ as: variant, children, className, title, ...props }) => {
  const textRef = createRefForVariant(variant)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const titleText = title || children?.toString()

  const handleMouseEnter = () => {
    if (textRef.current) {
      const isTextOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth
      setIsOverflowing(isTextOverflowing)
    }
  }

  return (
    <Text
      ref={textRef}
      as={variant}
      className={cn('line-clamp-1 overflow-ellipsis whitespace-nowrap block', className)}
      onMouseEnter={handleMouseEnter}
      title={isOverflowing ? titleText : ''}
      {...props}
    >
      {children}
    </Text>
  )
}
