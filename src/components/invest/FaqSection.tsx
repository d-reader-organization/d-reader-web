'use client'

import { Text } from '../ui'
import { FAQItem } from '../shared/FaqItem'
import { FAQItemType } from '@/constants/faqs'
import { Button, toast } from '@/components/ui'
import {
  ActivityNotification,
  ActivityNotificationType,
  ActivityNotificationWidget,
} from '@/components/shared/ActivityNotificationWidget'

export const FaqSection: React.FC<{ items: FAQItemType[] }> = ({ items }) => {
  const handleClick = () => {
    const data: ActivityNotification = {
      user: {
        id: 32,
        avatar: 'https://d-reader-dev-devnet.s3.amazonaws.com/users/32/avatar-1734976473359.gif',
        username: 'athar-dev',
        displayName: 'Athar',
      },
      targetId: 'bonk-and-the-curse-of-the-bear-king',
      targetTitle: 'BONK and the curse of the Bear King',
      createdAt: '2025-02-20T08:14:22.029Z',
      type: ActivityNotificationType.ExpressedInterest,
    }
    toast({
      description: <ActivityNotificationWidget notification={data} />,
      duration: 3000000000000,
      className: 'md:translate-y-[-200%] bg-transparent border-0',
    })
  }

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
      <Button onClick={handleClick}>CLICK ME</Button>
    </section>
  )
}

export default FaqSection
