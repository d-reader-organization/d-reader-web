'use client'

import React, { useState } from 'react'
import { Text, TextProps } from './Text'
import { Button } from './Button'

interface Props extends TextProps {
  maxLength?: number
}

export const TextWithViewMoreButton: React.FC<Props> = ({ maxLength = 150, children, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const text = children?.toString() ?? ''

  if (text.length <= maxLength) {
    return <Text {...props}>{text}</Text>
  }

  const displayText = isExpanded ? text : text.slice(0, maxLength) + '...'

  return (
    <Text {...props}>
      {displayText}
      {!isExpanded && (
        <Button
          variant='ghost'
          onClick={() => setIsExpanded(true)}
          className='ml-1 sm:ml-2 w-fit text-white underline p-0 py-0 sm:py-0 sm:px-0 min-w-fit max-sm:h-[28px]'
        >
          <Text {...props} className='text-white underline max-sm:text-sm'>
            view more
          </Text>
        </Button>
      )}
      {isExpanded && (
        <Button
          variant='ghost'
          onClick={() => setIsExpanded(false)}
          className='ml-1 sm:ml-2 w-fit text-white underline p-0 py-0 sm:py-0 sm:px-0 min-w-fit max-sm:h-[28px]'
        >
          <Text {...props} className='text-white underline max-sm:text-sm'>
            view less
          </Text>
        </Button>
      )}
    </Text>
  )
}
