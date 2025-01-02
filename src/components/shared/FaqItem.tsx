'use client'

import { useState, useRef } from 'react'
import { PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQItemType } from '@/constants/faqs'

export const FAQItem: React.FC<{ item: FAQItemType }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className={cn('border-t border-grey-300', isExpanded && 'border-b-0')}>
      <button
        className='flex justify-between items-center w-full text-left py-8 focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <p className='text-base md:text-xl font-bold'>{item.question}</p>
        {isExpanded ? (
          <MinusIcon className='size-6 text-gray-200 transition-transform duration-200' />
        ) : (
          <PlusIcon className='size-6 text-gray-200 transition-transform duration-200' />
        )}
      </button>
      <div
        ref={contentRef}
        className='overflow-hidden transition-all duration-200 ease-in-out'
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className='text-sm md:text-base font-medium leading-[140%] pb-4' style={{ whiteSpace: 'pre-wrap' }}>
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export const FAQItems: React.FC<{ items: FAQItemType[] }> = ({ items }) => {
  return (
    <div className='flex flex-col'>
      {items.map((faq, index) => (
        <FAQItem key={index} item={faq} />
      ))}
    </div>
  )
}
