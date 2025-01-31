import { formatPrice } from '@/utils/helpers'
import { isNil } from 'lodash'
import { roundNumber } from '@/utils/numbers'
import { Text } from '../../ui'
import clsx from 'clsx'
import React from 'react'
import { TextProps } from '../../ui'
import { cn } from '@/lib/utils'
import { SolanaIcon } from '@/components/icons/SolanaIcon'
import { SolanaColoredIcon } from '@/components/icons/SolanaColoredIcon'

interface Props extends Partial<TextProps> {
  price?: number | null
  reverse?: boolean
  from?: boolean
  symbol?: boolean
  icon?: boolean
  colorfulIcon?: boolean
  inline?: boolean
  maxDecimals?: number
  size: SolanaIconSize
  iconClassName?: string
}

export type SolanaIconSize = 'small' | 'medium' | 'large'

const sizeVariants: Record<SolanaIconSize, string> = {
  small: 'w-[6px] sm:w-2',
  medium: 'w-[10px] sm:w-3',
  large: 'w-[14px] sm:w-4',
}

export const PriceTag: React.FC<Props> = ({
  price,
  reverse = false,
  from = false,
  inline = true,
  symbol = false,
  icon = false,
  colorfulIcon = false,
  maxDecimals,
  as = 'p',
  styleVariant = 'body-normal',
  fontWeight = 'bold',
  size,
  iconClassName,
  className,
  ...props
}) => {
  const TypographyWrapper: React.FC<{ children: React.ReactNode }> = (tprops) => {
    return (
      <Text
        as={as}
        styleVariant={styleVariant}
        fontWeight={fontWeight}
        className={clsx(
          inline ? 'inline-flex' : 'flex',
          reverse ? 'flex-row-reverse' : 'flex-row',
          'items-center',
          className
        )}
        {...props}
      >
        {tprops.children}
      </Text>
    )
  }

  if (isNil(price)) return <TypographyWrapper>-.--</TypographyWrapper>
  if (price == 0) return <TypographyWrapper>free</TypographyWrapper>

  const formattedPrice = formatPrice(price)
  const roundedPrice = !isNil(maxDecimals) ? roundNumber(formattedPrice, maxDecimals) : formattedPrice

  return (
    <TypographyWrapper>
      {from ? 'from ' : ''}
      {symbol && <span>◎</span>}
      {icon && (
        <SolanaIcon
          style={{
            marginLeft: reverse ? '0.2rem' : '0.5rem',
            marginRight: reverse ? '0.5rem' : '0.2rem',
          }}
          className={cn(sizeVariants[size], iconClassName)}
        />
      )}
      {colorfulIcon && (
        <SolanaColoredIcon
          style={{
            marginLeft: reverse ? '0.2rem' : '0.5rem',
            marginRight: reverse ? '0.5rem' : '0.2rem',
          }}
          className={cn(sizeVariants[size], iconClassName)}
        />
      )}
      {roundedPrice}
    </TypographyWrapper>
  )
}
