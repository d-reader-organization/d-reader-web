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

export const CouponCardButton: React.FC<CardProps> = ({ coupon, discount, isSelected, onClick }) => (
  <button
    className={cn(
      'flex md:flex-col justify-between md:justify-center items-center md:items-start gap-3 p-4 rounded-xl bg-black bg-opacity-20 border border-dashed border-grey-200 w-full md:max-w-[212px] h-full max-h-20 md:max-h-[120px]',
      isSelected && 'border border-solid border-yellow-500 bg-yellow-500 bg-opacity-10'
    )}
    onClick={onClick}
  >
    <div className='flex gap-3 items-center'>
      <div className='flex md:flex-col gap-1 pr-3 border-r border-dashed border-r-grey-200 text-2xl font-semibold leading-[24px] tracking-[0.048px]'>
        <h6>{discount}%</h6>
        <h6 className='text-green-accent'>OFF</h6>
      </div>
      <span className='text-base font-medium leading-[22.4px]'>{coupon.name}</span>
    </div>
    <div className='flex max-md:flex-col justify-center items-center rounded-lg bg-black py-2 px-1 max-h-12 md:max-h-7'>
      <span className='text-xs md:text-base font-medium leading-[22.4px] text-grey-50'>Used&nbsp;</span>
      <div className='flex items-center'>
        <span className='text-xs md:text-base font-medium leading-[22.4px] text-grey-200'>
          {coupon.stats.itemsMinted ?? 0}&nbsp;
        </span>
        <span className='text-xs md:text-base font-medium leading-[140%] text-grey-200'>
          &nbsp;/&nbsp;{coupon.numberOfRedemptions}
        </span>
      </div>
    </div>
  </button>
)
