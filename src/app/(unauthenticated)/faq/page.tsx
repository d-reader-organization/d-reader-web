import { BaseLayout } from '@/components/layout/BaseLayout'
import { FAQItems } from '@/components/shared/FaqItem'
import { Text } from '@/components/ui'
import { STANDARD_FAQ_ITEMS } from '@/constants/faqs'
import { SUPPORT_EMAIL } from '@/constants/general'
import React from 'react'

export default function FaqPage() {
  return (
    <BaseLayout showFooter>
      <div className='flex flex-col gap-8 mx-auto w-full max-w-screen-md'>
        <div className='flex flex-col gap-2'>
          <Text as='h3' styleVariant='secondary-heading'>
            Frequent Questions
          </Text>
          <Text as='p' styleVariant='body-normal' className='text-grey-200 font-medium'>
            If you have any particular questions or concerns, contact us at&nbsp;
            <span className='text-important-color'>{SUPPORT_EMAIL}</span>
          </Text>
        </div>

        <FAQItems items={STANDARD_FAQ_ITEMS} />
      </div>
    </BaseLayout>
  )
}
