import { CommonDialogProps } from '@/models/common'
import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import React from 'react'
import { CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { getCouponDiscount } from '@/utils/mint'
import { RoutePath } from '@/enums/routePath'
import { ComicIssue } from '@/models/comicIssue'
import { ConnectButton } from '../buttons/ConnectButton'
import Link from 'next/link'
import { Text } from '@/components/ui'
import { cn, withRedirect } from '@/lib/utils'
import { CheckCircleIcon } from '@/components/icons/theme/CheckCircleIcon'
import { XCircleIcon } from '@/components/icons/theme/XCircleIcon'

const getCouponAction = (couponType: CouponType, comicIssue: ComicIssue) => {
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

export const CouponDescriptionDialog: React.FC<CommonDialogProps & { comicIssue: ComicIssue }> = ({
  open,
  toggleDialog,
  comicIssue,
}) => {
  const { coupons, candyMachine } = useCandyMachineStore((state) => state)

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Available discounts
            </Text>
          </DialogTitle>
          <DialogDescription className='text-left'>
            {coupons.map((coupon, index) => {
              const discount = getCouponDiscount(candyMachine?.coupons ?? [], coupon)
              const isEligible = coupon.stats.isEligible
              const Icon = isEligible ? CheckCircleIcon : XCircleIcon

              return (
                <div className='rounded-xl bg-grey-400 p-4 gap-4 flex' key={index}>
                  <Icon className={cn('size-5', isEligible ? 'text-green-500' : 'text-red-500')} />
                  <div className='inline-block gap-2 w-full'>
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
                        {getCouponAction(coupon.type, comicIssue)}
                      </Text>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </DialogDescription>
        </DialogHeader>

        <DialogButton onClick={toggleDialog}>Got it!</DialogButton>
      </DialogContent>
    </Dialog>
  )
}
