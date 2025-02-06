'use client'

import { useState } from 'react'
import { FAQItemType } from '@/constants/faqs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Text } from '@/components/ui/Text'
import { cn } from '@/lib/utils'
import { MinusIcon } from '../icons/theme/MinusIcon'
import { PlusIcon } from '../icons/theme/PlusIcon'

export const FAQItem: React.FC<{ item: FAQItemType }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = isExpanded ? MinusIcon : PlusIcon

  return (
    <Collapsible onOpenChange={setIsExpanded} className={cn('border-t border-grey-300', isExpanded && 'border-b-0')}>
      <CollapsibleTrigger className='flex justify-between items-center w-full text-left py-8 focus:outline-none'>
        <Text as='h5' styleVariant='secondary-heading'>
          {item.question}
        </Text>
        <Icon className='size-6 transition-transform duration-200' />
      </CollapsibleTrigger>
      <CollapsibleContent className='pb-4'>
        <Text as='span' styleVariant='body-normal' className='whitespace-pre-wrap'>
          {item.answer}
        </Text>
      </CollapsibleContent>
    </Collapsible>
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
