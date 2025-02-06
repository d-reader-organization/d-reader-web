'use client'

import { CandyMachine } from '@/models/candyMachine'
import React from 'react'
import { ProgressBar } from './ProgressBar'
import { MintButton } from './buttons/MintButton'
import { ComicIssue } from '@/models/comicIssue'
import { CouponCurrencySetting } from '@/models/candyMachine/candyMachineCoupon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { LockIcon } from '@/components/icons/theme/LockIcon'
import { Skeleton } from '../ui/Skeleton'
import { checkIfCouponIsActive, getTokenMap, getTotalItemsMintedByUser, TokenDetail } from '@/utils/mint'
import { Divider } from './Divider'
import { CouponsSection, CouponsSectionLoading } from '../mint/CouponsSection'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { Button } from '../ui/Button'
import { Text } from '../ui/Text'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { useCountdown } from '@/hooks/useCountdown'
import { ChevronDownIcon } from '../icons/theme/ChevronDownIcon'
import { MinusIcon } from '../icons/theme/MinusIcon'
import { PlusIcon } from '../icons/theme/PlusIcon'

const normalise = (value: number, MAX: number): number => (value * 100) / MAX
type DetailsProps = { candyMachine: CandyMachine }
type CandyMachineDetailsProps = {
  comicIssue: ComicIssue
  bounce?: boolean
  onMint?: VoidFunction
}

export const CandyMachineDetails: React.FC<CandyMachineDetailsProps> = ({ comicIssue, bounce = false, onMint }) => {
  const { candyMachine, selectedCoupon, isLoading, coupons } = useCandyMachineStore((state) => state)

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    candyMachine && (
      <div className='flex flex-col gap-6'>
        {selectedCoupon && (
          <div className='flex flex-col gap-6 rounded-2xl p-4 sm:p-6 bg-grey-500 max-h-fit max-w-[800px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]'>
            <CouponDetails />
            <UserDetails candyMachine={candyMachine} />
            <ProgressBar value={normalise(candyMachine.itemsMinted, candyMachine.supply)} />

            {/* Comic Vault */}
            <Collapsible className='bg-grey-400 border-transparent rounded-xl'>
              <CollapsibleTrigger className='w-full p-3'>
                <div className='flex gap-2 items-center w-full'>
                  <LockIcon className='size-4' />
                  <span className='text-base font-medium leading-[22.4px] text-grey-100'>Comic Vault</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent asChild className='px-3 pb-3'>
                <Text as='p' styleVariant='body-normal'>
                  Comic Vault stores portion of the supply of each issue to later use in giveaways & other activities
                  where we reward loyal users.
                </Text>
              </CollapsibleContent>
            </Collapsible>

            <PurchaseRow comicIssue={comicIssue} bounce={bounce} onMint={onMint} />
          </div>
        )}
        {coupons.length ? (
          <>
            <Divider className='max-md:hidden' />
            <CouponsSection comicIssue={comicIssue} />
          </>
        ) : null}
      </div>
    )
  )
}

const LoadingSkeleton: React.FC = () => (
  <div className='flex flex-col gap-6'>
    <div className='flex flex-col gap-6 rounded-2xl p-4 sm:p-6 bg-grey-500 max-h-fit max-w-[800px]'>
      <CouponSkeleton />
      <div className='h-[19.6px] md:h-[22.4px] w-full flex items-center justify-between'>
        <Skeleton className='h-[19.6px] md:h-[22.4px] w-32' />
        <Skeleton className='h-[19.6px] md:h-[22.4px] w-10' />
      </div>
      <Skeleton className='h-2' />
      <Skeleton className='h-[48.5px] md:h-[47.5px] w-[95%]' />
      <div className='max-md:hidden h-[52px] flex gap-4 items-center'>
        <Skeleton className='h-full w-40' />
        <Skeleton className='h-full w-40' />
      </div>
    </div>
    <Divider className='max-md:hidden' />
    <CouponsSectionLoading />
  </div>
)

const CouponDetails: React.FC = () => {
  const {
    selectedCoupon,
    selectedCurrency,
    supportedTokens = [],
    updateSelectedCurrency,
  } = useCandyMachineStore((state) => state)
  const { countdownString } = useCountdown({ expirationDate: selectedCoupon?.startsAt })

  if (!selectedCoupon) {
    return null
  }

  const { prices } = selectedCoupon
  const tokenMap = getTokenMap(prices, supportedTokens)
  const selectedCurrencySetting = selectedCurrency ? tokenMap.get(selectedCurrency.label) : undefined

  if (!prices.length || !selectedCurrencySetting) return <CouponSkeleton />

  const isLive = checkIfCouponIsActive(selectedCoupon)
  const disabled = prices.length === 1
  const title = `Price for this item is ${selectedCurrencySetting.price} ${selectedCurrencySetting.symbol} (${selectedCurrencySetting.name})`

  return (
    <Collapsible className='flex flex-col w-full' disabled={disabled}>
      <div className='flex items-center gap-2 justify-between max-h-9'>
        <span className={cn('text-base md:text-2xl leading-[16px] md:leading-[24px] font-bold text-important-color')}>
          {isLive ? '● Live' : '● Live in ' + countdownString}
        </span>
        <CollapsibleTrigger
          title={title}
          className='flex gap-2 items-center w-fit rounded-xl border-none bg-grey-600 p-2'
        >
          <span className='text-base md:text-2xl font-bold leading-[16px] md:leading-[24px]'>
            {selectedCurrencySetting.price}
          </span>
          <Image
            alt={selectedCurrencySetting.name}
            src={selectedCurrencySetting.icon ?? selectedCurrencySetting.symbol}
            width={24}
            height={24}
            className='size-6'
          />
          {!disabled && <ChevronDownIcon className='size-6' />}
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent asChild className='w-full'>
        <div className='flex flex-col gap-1 w-full pt-2'>
          {prices.map((setting) => {
            const token = tokenMap.get(setting.label)
            if (!token) return null
            return (
              <CurrencyRow
                key={setting.label}
                isSelected={selectedCurrency?.label == setting.label}
                setCurrency={updateSelectedCurrency}
                currencySetting={setting}
                token={token}
              />
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const CouponSkeleton: React.FC = () => (
  <div className='flex items-center justify-between h-9 md:h-10'>
    <Skeleton className='h-9 md:h-10 w-20' />
    <Skeleton className='h-9 md:h-10 w-28' />
  </div>
)

type CurrencyRowProps = {
  isSelected?: boolean
  setCurrency: (currency: CouponCurrencySetting) => void
  currencySetting: CouponCurrencySetting
  token: TokenDetail
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({ isSelected = false, token, setCurrency, currencySetting }) => {
  return (
    <button
      className={cn(
        'flex justify-between items-center p-4 rounded-2xl border border-grey-300 bg-grey-600 hover:border-yellow-100 hover:bg-yellow-100 hover:bg-opacity-[0.08]',
        isSelected && 'border border-yellow-300 bg-yellow-300 bg-opacity-[0.08]'
      )}
      onClick={() => setCurrency(currencySetting)}
    >
      <div className='flex items-center gap-2'>
        <Image alt='' src={token.icon} width={16} height={16} className='size-5' />
        <span className='text-base font-medium leading-[22.4px]'>{token.name}</span>
      </div>
      <span className='text-base font-medium leading-[22.4px]'>{token.price}</span>
    </button>
  )
}

const UserDetails: React.FC<DetailsProps> = ({ candyMachine }) => {
  const totalItemsMintedByUser = getTotalItemsMintedByUser(candyMachine.coupons)

  return (
    <div className='flex justify-between text-center text-grey-100 text-sm md:text-base font-medium leading-[19.6px] md:leading-[22.4px]'>
      <span>You minted: {totalItemsMintedByUser}</span>
      <span>
        Total minted: {candyMachine.itemsMinted}/{candyMachine.supply}
      </span>
    </div>
  )
}

type PurchaseRowProps = {
  comicIssue: ComicIssue
  bounce?: boolean
  onMint?: VoidFunction
} & React.HTMLAttributes<HTMLDivElement>

export const PurchaseRow: React.FC<PurchaseRowProps> = ({ comicIssue, className, bounce = false, onMint }) => {
  const { updateNumberOfItems, numberOfItems } = useCandyMachineStore((state) => state)

  return (
    <div
      className={cn(
        'flex gap-4 max-md:w-full max-md:max-h-[84px] max-md:p-4 items-center w-full max-h-[84px] md:max-h-[52px] max-md:fixed max-md:bottom-0 max-md:z-50 max-md:bg-grey-600 max-md:-ml-8 max-md:justify-center',
        className
      )}
    >
      <div className='max-h-[52px] min-w-[150px] p-2.5 flex justify-between items-center rounded-xl bg-grey-400'>
        <Button
          variant='inline'
          className='bg-grey-500 w-9 h-9'
          Icon={MinusIcon}
          onClick={() => updateNumberOfItems(numberOfItems - 1)}
        />
        <span className='text-sm md:text-base font-medium leading-[19.6px] md:leading-[22.4px]'>{numberOfItems}</span>
        <Button
          variant='inline'
          className='bg-grey-500 w-9 h-9'
          Icon={PlusIcon}
          onClick={() => updateNumberOfItems(numberOfItems + 1)}
        />
      </div>
      <MintButton comicIssue={comicIssue} bounce={bounce} onMint={onMint} />
    </div>
  )
}
