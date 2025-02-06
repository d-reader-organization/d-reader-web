'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type ExpandableTextProps = {
  text: string
  maxLines?: number
  variant?: 'white' | 'yellow'
} & React.HTMLAttributes<HTMLDivElement>

export const ExpandableText = ({ className, text, maxLines = 2, variant = 'yellow' }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight)
      const maxHeight = lineHeight * maxLines
      setShowToggle(textRef.current.scrollHeight > maxHeight)
    }
  }, [text, maxLines])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={cn('relative text-base font-medium', className)}>
      <p
        ref={textRef}
        className={cn(
          'transition-all duration-300 ease-in-out overflow-hidden text-grey-100',
          isExpanded ? '' : `line-clamp-2`
        )}
      >
        {text}
      </p>
      {showToggle && (
        <button
          onClick={toggleExpand}
          className={cn('flex items-center', variant === 'yellow' ? 'text-yellow-300' : 'text-white')}
          aria-expanded={isExpanded}
          aria-controls='expandable-text'
        >
          {isExpanded ? 'view less' : 'view more'}
        </button>
      )}
    </div>
  )
}
