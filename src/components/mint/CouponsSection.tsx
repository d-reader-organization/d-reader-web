'use client'

import React from 'react'
import { getCouponDiscount } from '@/utils/mint'
import { CouponCardButton } from './CouponCardButton'
import { Skeleton } from '../ui/Skeleton'
import { Text } from '../ui/Text'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { CouponDescriptionDialog } from '../shared/dialogs/CouponDescriptionDialog'
import { useToggle } from '@/hooks'
import { InfoIcon } from '@/components/icons/theme/InfoIcon'
import { TicketIcon } from '@/components/icons/theme/TicketIcon'
import { ComicIssue } from '@/models/comicIssue'
import { Button } from '../ui/Button'

export const CouponsSection: React.FC<{ comicIssue: ComicIssue }> = ({ comicIssue }) => {
  const { coupons, selectedCoupon, updateSelectedCoupon, candyMachine } = useCandyMachineStore((state) => state)
  const [showCouponDescriptionDialog, toggleCouponDescriptionDialog] = useToggle(false)
  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-3 items-center xs:gap-3 max-h-[22px]'>
          <TicketIcon className='size-6' />
          <Text as='h5' styleVariant='primary-heading' className='mt-1'>
            Discount coupons
          </Text>
          <Button variant='inline' Icon={InfoIcon} iconOnly onClick={toggleCouponDescriptionDialog} solid={false} />
        </div>
        <div className='flex items-center gap-3 flex-wrap'>
          {coupons.map((coupon) => (
            <CouponCardButton
              coupon={coupon}
              discount={getCouponDiscount(candyMachine?.coupons || [], coupon)}
              key={`${coupon.name}-${coupon.id}`}
              isSelected={selectedCoupon ? selectedCoupon.id === coupon.id : false}
              onClick={() => updateSelectedCoupon(coupon)}
            />
          ))}
        </div>
      </div>
      <CouponDescriptionDialog
        open={showCouponDescriptionDialog}
        toggleDialog={toggleCouponDescriptionDialog}
        comicIssue={comicIssue}
      />
    </>
  )
}

export const CouponsSectionLoading: React.FC = () => (
  <>
    <Skeleton className='h-[49px] md:hidden w-full' />
    <div className='flex flex-col gap-6 max-md:hidden'>
      <Skeleton className='h-[22px] w-44' />
      <div className='flex items-center gap-3'>
        <Skeleton className='max-w-[212px] w-full h-[137px]' />
        <Skeleton className='max-w-[212px] w-full h-[137px]' />
        <Skeleton className='max-w-[212px] w-full h-[137px]' />
      </div>
    </div>
  </>
)
