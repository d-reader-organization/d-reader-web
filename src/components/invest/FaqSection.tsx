'use client'

import { Text } from '../ui'
import { FAQItem } from '../shared/FaqItem'
import { FAQItemType } from '@/constants/faqs'

export const FaqSection: React.FC<{ items: FAQItemType[] }> = ({ items }) => {
  return (
    <section className='w-full py-4 md:py-12 flex flex-col gap-4 md:gap-10 justify-start'>
      <Text as='h3' styleVariant='primary-heading'>
        Frequently Asked Questions
      </Text>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-10'>
        {items.map((item, index) => (
          <FAQItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

export default FaqSection
