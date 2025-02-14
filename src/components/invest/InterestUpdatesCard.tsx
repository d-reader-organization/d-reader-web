'use client'

import { formatDistanceToNow } from 'date-fns'
import { Text } from '../ui'
import { Divider } from '../shared/Divider'
import { UserInterestedReceipt } from '@/models/project'
import { PLACEHOLDER_AVATAR } from '@/constants/general'
import clsx from 'clsx'
import Image from 'next/image'
import { ActivityIcon } from '@/components/icons/theme/ActivityIcon'

type Props = {
  receipts: UserInterestedReceipt[]
} & React.HtmlHTMLAttributes<HTMLDivElement>

export const InterestUpdatesCard: React.FC<Props> = ({ className, receipts }) => {
  return (
    receipts &&
    receipts.length > 0 && (
      <div
        className={clsx(
          'flex flex-col mx-auto mt-8 w-full md:max-w-[488px] md:max-h-[478px] bg-grey-500 rounded-xl p-2 max-md:rounded-none',
          className
        )}
      >
        <div className='flex justify-between rounded-t-lg py-6 px-4 bg-grey-600 max-md:bg-grey-500 items-center'>
          <Text as='h5' styleVariant='primary-heading' className='text-20'>
            Campaign Activity
          </Text>
          <ActivityIcon className='size-6' />
        </div>
        <div className='bg-grey-300 overflow-y-auto max-h-[362px]'>
          <div className='flex flex-col gap-6 p-6 pl-4 pr-2 bg-grey-500'>
            {receipts.map((receipt, index) => (
              <div key={receipt.id} className='flex flex-col gap-6'>
                <div className='flex gap-4'>
                  <Image
                    alt='avatar'
                    src={receipt.user.avatar || PLACEHOLDER_AVATAR}
                    width={32}
                    height={32}
                    className='size-7 object-cover rounded-full border border-black'
                  />
                  <Text as='p' styleVariant='body-normal'>
                    <strong>{receipt.user.username}</strong> is down to contribute&nbsp;
                    <strong>${receipt.expressedAmount}!</strong>
                    <br />
                    <span className='italic text-grey-100'>
                      {formatDistanceToNow(new Date(receipt.timestamp), { addSuffix: true })}
                    </span>
                  </Text>
                </div>
                <Divider className={index == receipts.length - 1 ? 'hidden' : ''} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}
