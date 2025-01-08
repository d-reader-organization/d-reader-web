'use client'

import React from 'react'
import { Text } from '../ui'
import { FAQItems } from '../shared/FaqItem'
import { SUPPORT_EMAIL } from '@/constants/general'
import { PROFILE_FAQ_ITEMS } from '@/constants/faqs'

export const FaqSettings: React.FC = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Text as='h4' styleVariant='secondary-heading'>
          Frequent Questions
        </Text>
        <Text as='p' styleVariant='body-normal' className='text-grey-200 font-medium'>
          If you have any particular questions or concerns, contact us at&nbsp;
          <span className='text-important-color'>{SUPPORT_EMAIL}</span>
        </Text>
      </div>

      <FAQItems items={PROFILE_FAQ_ITEMS} />
    </div>
  )
}
