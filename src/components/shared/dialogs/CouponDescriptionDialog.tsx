import { CommonDialogProps } from '@/models/common'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import { CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { getCouponDiscount } from '@/utils/mint'
import { Button } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { ComicIssue } from '@/models/comicIssue'
import { ConnectButton } from '../buttons/ConnectButton'
import Link from 'next/link'
import { Text } from '@/components/ui'
import { withRedirect } from '@/lib/utils'
import { CheckCircle2Icon, CircleX } from 'lucide-react'

export const CouponDescriptionDialog: React.FC<CommonDialogProps & { comicIssue: ComicIssue }> = ({
  open,
  toggleDialog,
  comicIssue,
}) => {
  const { coupons, candyMachine } = useCandyMachineStore((state) => state)

  const getCouponAction = (couponType: CouponType) => {
    switch (couponType) {
      case CouponType.RegisteredUser || CouponType.WhitelistedUser:
        return (
          <>
            <Link className='underline' href={withRedirect(RoutePath.Register, RoutePath.Mint(comicIssue.id))}>
              Register
            </Link>
            &nbsp;/&nbsp;
            <Link className='underline' href={withRedirect(RoutePath.Login, RoutePath.Mint(comicIssue.id))}>
              Login →
            </Link>
          </>
        )
      case CouponType.WhitelistedWallet || CouponType.PublicUser:
        return <ConnectButton className='[all:unset] h-fit p-0 xs:underline  sm:h-fit sm:p-0 sm:underline' />
      default:
        return ''
    }
  }
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        aria-describedby=''
        className='max-w-[485px] rounded-2xl flex flex-col items-center bg-grey-400 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] p-6 pt-8 gap-4'
        showCloseIcon={false}
      >
        <DialogTitle className='font-satoshi leading-[24px] text-xl'>Available discounts</DialogTitle>
        <div className='flex flex-col gap-2 w-full'>
          {coupons.map((coupon, index) => {
            const discount = getCouponDiscount(candyMachine?.coupons ?? [], coupon)
            const isEligible = coupon.stats.isEligible
            return (
              <div className='rounded-xl bg-grey-500 p-4 gap-4 flex max-w-[437px]' key={index}>
                <div className='size-5'>
                  {isEligible ? (
                    <CheckCircle2Icon className='size-5 text-green-500' />
                  ) : (
                    <CircleX className='size-5 text-red-500' />
                  )}
                </div>
                <div className='inline-block gap-2 w-full max-w-[369px]'>
                  <Text as='p' styleVariant='body-normal' fontWeight='bold' className='max-sm:text-xs'>
                    {coupon.name} {discount ? `-${discount}% off` : null}
                  </Text>
                  <Text
                    as='p'
                    styleVariant='body-small'
                    fontWeight='medium'
                    className=' text-grey-100 text-ellipsis overflow-auto'
                  >
                    {coupon.description}
                  </Text>
                  {!isEligible ? (
                    <Text
                      as='p'
                      styleVariant='body-small'
                      className='max-sm:text-xs text-end text-grey-100 decoration-1 cursor-pointer'
                    >
                      {getCouponAction(coupon.type)}
                    </Text>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
        <Button variant='secondary' className='rounded-[16px] font-bold text-base w-full' onClick={toggleDialog}>
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
