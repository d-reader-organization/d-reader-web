'use client'

import { CandyMachine } from '@/models/candyMachine'
import React from 'react'
import { ProgressBar } from './ProgressBar'
import { CurrencyExpandable, Expandable } from './Expandable'
import LockIcon from 'public/assets/vector-icons/lock.svg'
import { MintButton } from './buttons/MintButton'
import { ComicIssue } from '@/models/comicIssue'
import { CouponCurrencySetting } from '@/models/candyMachine/candyMachineCoupon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Skeleton } from '../ui/Skeleton'
import { checkIfCouponIsActive, getTokenMap, getTotalItemsMintedByUser, TokenDetail } from '@/utils/mint'
import { Divider } from './Divider'
import { CouponsSection, CouponsSectionLoading } from '../mint/CouponsSection'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'

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
            <ComicVault />
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

  if (!selectedCoupon) {
    return null
  }

  const prices = selectedCoupon.prices

  const tokenMap = getTokenMap(selectedCoupon.prices, supportedTokens)
  const selectedCurrencySetting = selectedCurrency ? tokenMap.get(selectedCurrency.label) : undefined
  return prices.length && selectedCurrencySetting ? (
    <CurrencyExpandable
      disableExpand={prices.length === 1}
      isLive={checkIfCouponIsActive(selectedCoupon)}
      startsAt={selectedCoupon.startsAt}
      selectedCurrencySetting={selectedCurrencySetting}
    >
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
    </CurrencyExpandable>
  ) : (
    <CouponSkeleton />
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
        'flex justify-between items-center p-4 rounded-2xl border border-grey-300 bg-grey-600',
        isSelected && 'border border-yellow-300 bg-yellow-300 bg-opacity-[0.08]'
      )}
      onClick={() => setCurrency(currencySetting)}
    >
      <div className='flex items-center gap-2'>
        <Image alt='' src={token.icon} width={16} height={16} className='w-5 h-5' />
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

const ComicVault: React.FC = () => (
  <Expandable
    className='bg-grey-400 border-transparent rounded-2xl max-w-[800px]'
    title='Comic Vault'
    titleComponent={
      <div className='flex gap-2 items-center text-sm sm:text-base font-medium leading-5 text-grey-100'>
        <LockIcon className='size-4' />
        <span className='text-base font-medium leading-[22.4px] text-grey-100'>Comic Vault</span>
      </div>
    }
    hideArrow
  >
    <p className='text-grey-100 text-sm m-0 leading-5 sm:text-lg'>
      Comic Vault stores portion of the supply of each issue to later use in giveaways & other activities where we
      reward loyal users.
    </p>
  </Expandable>
)

type PurchaseRowProps = {
  comicIssue: ComicIssue
  bounce?: boolean
  onMint?: VoidFunction
} & React.HTMLAttributes<HTMLDivElement>

export const PurchaseRow: React.FC<PurchaseRowProps> = ({ comicIssue, className, bounce = false, onMint }) => {
  return (
    <div
      className={cn(
        'flex gap-4 max-md:w-full max-md:max-h-[84px] max-md:p-4 items-center w-full max-h-[84px] md:max-h-[52px] max-md:fixed max-md:bottom-0 max-md:z-50 max-md:bg-grey-600 max-md:-ml-8 max-md:justify-center',
        className
      )}
    >
      <NumberOfItemsWidget />
      <MintButton comicIssue={comicIssue} bounce={bounce} onMint={onMint} />
    </div>
  )
}

const NumberOfItemsWidget: React.FC = () => {
  const { updateNumberOfItems, numberOfItems } = useCandyMachineStore((state) => state)
  return (
    <div className='max-h-[52px] min-w-[150px] p-2.5 flex justify-between items-center rounded-xl bg-grey-400'>
      <ButtonIconWrapper onClick={() => updateNumberOfItems(numberOfItems - 1)}>
        <MinusIcon className='size-4 md:size-5' />
      </ButtonIconWrapper>
      <span className='text-sm md:text-base font-medium leading-[19.6px] md:leading-[22.4px]'>{numberOfItems}</span>
      <ButtonIconWrapper onClick={() => updateNumberOfItems(numberOfItems + 1)}>
        <PlusIcon className='size-4 md:size-5' />
      </ButtonIconWrapper>
    </div>
  )
}

type ButtonIconWrapperProps = { onClick: () => void } & React.PropsWithChildren

const ButtonIconWrapper: React.FC<ButtonIconWrapperProps> = ({ onClick, children }) => {
  return (
    <button className='flex p-2 justify-center rounded-lg bg-grey-500' onClick={onClick}>
      {children}
    </button>
  )
}
