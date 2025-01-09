'use client'

import React from 'react'
import { CandyMachineCoupon } from '@/models/candyMachine/candyMachineCoupon'
import { cn } from '@/lib/utils'

type CardProps = {
  coupon: CandyMachineCoupon
  isSelected: boolean
  discount: number
  onClick: () => void
}

const registeredUserCoupon = 'RegisteredUser'

export const CouponCardButton: React.FC<CardProps> = ({ coupon, discount, isSelected, onClick }) => (
  <button
    disabled={!coupon.stats.isEligible}
    className={cn(
      'flex md:flex-col justify-between md:justify-center items-center md:items-start gap-3 p-4 rounded-xl bg-black bg-opacity-20 border border-dashed border-grey-200 w-full md:max-w-[212px] h-full max-h-20 md:max-h-[120px]',
      isSelected && 'border border-solid border-yellow-300 bg-yellow-300 bg-opacity-10',
      !coupon.stats.isEligible && 'opacity-40'
    )}
    onClick={onClick}
  >
    <div className='flex gap-3 items-center'>
      <div className='flex md:flex-col gap-1 pr-3 border-r border-dashed border-r-grey-200 text-2xl font-semibold leading-[24px] tracking-[0.048px]'>
        <h6>{discount}%</h6>
        <h6 className={!coupon.stats.isEligible ? 'text-grey-200' : 'text-green-accent'}>OFF</h6>
      </div>
      <span className='text-base font-medium leading-[22.4px] text-start'>
        {coupon.name === registeredUserCoupon ? 'Registered user' : coupon.name}
      </span>
    </div>
    <div className='flex max-md:flex-col justify-center items-center rounded-lg bg-black p-2 md:p-1 max-h-12 w-fit md:max-h-7 md:w-full'>
      <span className='text-xs md:text-base font-medium leading-[22.4px] text-grey-50'>Used&nbsp;</span>
      <div className='flex items-center'>
        <span className='text-xs md:text-base font-medium leading-[22.4px] text-grey-200'>
          {coupon.stats.itemsMinted ?? 0}&nbsp;
        </span>
        <span className='text-xs md:text-base font-medium leading-[140%] text-grey-200'>
          &nbsp;/&nbsp;{coupon.numberOfRedemptions ?? '∞'}
        </span>
      </div>
    </div>
  </button>
)
