'use client'

import React, { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import useEventListener from '@/hooks/useEventListener'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { TokenDetail } from '@/utils/mint'
import { useCountdown } from '@/hooks/useCountdown'
import { ChevronDown } from '@/components/icons/theme/ChevronDown'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  titleComponent?: React.ReactNode
  children?: React.ReactNode
  open?: boolean
  hideArrow?: boolean
}

export const Expandable: React.FC<Props> = ({
  title,
  titleComponent,
  open = false,
  children,
  hideArrow = false,
  className,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(open)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null)

  const handleContentHeightChange = useCallback(() => {
    if (!contentRef) return 0

    setContentHeight(
      contentRef.clientHeight +
        +contentRef.style.getPropertyValue('padding-top').split('px')[0] +
        +contentRef.style.getPropertyValue('padding-bottom').split('px')[0]
    )
  }, [contentRef])

  useEffect(() => {
    handleContentHeightChange()
  }, [handleContentHeightChange])
  useEventListener('resize', handleContentHeightChange)

  return (
    <div
      className={cn(
        'w-full max-w-[912px] bg-grey-600 border-t border-t-grey-300 border-b border-b-grey-300',
        className
      )}
      {...props}
    >
      <div
        className='flex justify-between items-center w-full p-3 font-bold text-base leading-5 cursor-pointer'
        onClick={() => setIsExpanded((currentIsExpanded) => !currentIsExpanded)}
      >
        {titleComponent ?? title}
        {hideArrow ? null : (
          <ChevronDown
            className={clsx('w-6 h-6 text-white transition transform duration-150 ease-in-out', {
              'transform -rotate-180': isExpanded,
            })}
          />
        )}
      </div>
      <div
        className={clsx('w-full h-0 transition-height ease-in-out overflow-hidden', {
          'h-[var(--content-height)]': isExpanded,
        })}
        style={{ '--content-height': `${contentHeight}px` } as React.CSSProperties}
      >
        <div ref={(contentRef) => setContentRef(contentRef)} className='py-2 px-3'>
          {children}
        </div>
      </div>
    </div>
  )
}

type CurrencyExpandableProps = {
  disableExpand?: boolean
  isLive?: boolean
  startsAt: string
  selectedCurrencySetting: TokenDetail
  open?: boolean
} & React.PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement>

export const CurrencyExpandable: React.FC<CurrencyExpandableProps> = ({
  children,
  disableExpand = false,
  isLive = false,
  startsAt,
  open = false,
  selectedCurrencySetting,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(open)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null)
  const { countdownString } = useCountdown({ expirationDate: startsAt })

  const handleContentHeightChange = useCallback(() => {
    if (!contentRef) return 0

    setContentHeight(
      contentRef.clientHeight +
        +contentRef.style.getPropertyValue('padding-top').split('px')[0] +
        +contentRef.style.getPropertyValue('padding-bottom').split('px')[0]
    )
  }, [contentRef])

  useEffect(() => {
    handleContentHeightChange()
  }, [handleContentHeightChange])
  useEventListener('resize', handleContentHeightChange)

  // const discountWidget = (
  //   <div className='p-1.5 flex justify-center items-center rounded-xl bg-yellow-300'>
  //     <span className='text-base text-grey-600 font-bold leading-[22.4px]'>-{100}&#37;</span>
  //   </div>
  // )

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center gap-2 justify-between max-h-9 md:max-h-10'>
        <span className={cn('text-base md:text-2xl leading-[16px] md:leading-[24px] font-bold text-important-color')}>
          {isLive ? '● Live' : '● Live in ' + countdownString}
        </span>
        <div className='flex gap-2 items-center'>
          {/* {discountWidget} */}
          <button
            className='flex gap-2 items-center w-fit rounded-xl border-none bg-grey-600 p-2'
            onClick={disableExpand ? () => {} : () => setIsExpanded((currentIsExpanded) => !currentIsExpanded)}
          >
            <span className='text-base md:text-2xl font-bold leading-[16px] md:leading-[24px]'>
              {selectedCurrencySetting.price}
            </span>
            <Image
              alt={selectedCurrencySetting.name}
              src={selectedCurrencySetting.icon ?? selectedCurrencySetting.symbol}
              width={20}
              height={20}
              className='w-6 h-6'
            />
            {disableExpand ? null : (
              <ChevronDown
                className={clsx('transition transform duration-150 ease-in-out', {
                  'transform -rotate-180': isExpanded,
                })}
              />
            )}
          </button>
        </div>
      </div>

      <div
        className={clsx('w-full max-w-[912px] h-0 transition-height ease-in-out overflow-hidden', {
          'h-[var(--content-height)] mt-6': isExpanded,
        })}
        style={{ '--content-height': `${contentHeight}px` } as React.CSSProperties}
      >
        <div className='flex flex-col gap-2' ref={(contentRef) => setContentRef(contentRef)}>
          {children}
        </div>
      </div>
    </div>
  )
}
