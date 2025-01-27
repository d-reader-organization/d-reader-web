import React, { JSX } from 'react'
import { cn } from '@/lib/utils'

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type StyleVariant =
  | 'primary-heading'
  | 'secondary-heading'
  | 'body-xlarge'
  | 'body-large'
  | 'body-normal'
  | 'body-small'
  | 'body-xsmall'
  | 'body-xxsmall'

type FontWeight = 'bold' | 'semibold' | 'medium' | 'normal'

const variantStyles: Record<Variant, string> = {
  h1: 'text-40 sm:text-48 tracking-0096',
  h2: 'text-32 sm:text-40 tracking-008',
  h3: 'text-24 sm:text-32 tracking-0064',
  h4: 'text-20 sm:text-24 tracking-0048',
  h5: 'text-16 sm:text-20 tracking-004',
  h6: 'text-14 sm:text-16 tracking-0032',
  p: 'text-base font-normal font-satoshi',
  span: 'text-base font-normal font-satoshi',
}

const styleVariants: Record<StyleVariant, string> = {
  'primary-heading': 'font-semibold leading-tight font-obviouslyNarrow',
  'secondary-heading': 'font-bold leading-tight font-satoshi tracking-normal',
  'body-xlarge': 'text-xl',
  'body-large': 'text-lg',
  'body-normal': 'text-base',
  'body-small': 'text-sm',
  'body-xsmall': 'text-xs',
  'body-xxsmall': 'text-xxs',
}

const fontWeightVariants: Record<FontWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
}

export const variantToElement = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
}

export type TextRef = HTMLSpanElement | HTMLParagraphElement | HTMLHeadingElement

export type TextProps<T extends Variant = Variant> = {
  as: T
  styleVariant: StyleVariant
  children: React.ReactNode
  className?: string
  fontWeight?: FontWeight
  italic?: boolean
} & React.HTMLAttributes<JSX.IntrinsicElements[T]>

export const Text = React.forwardRef<TextRef, TextProps>(
  ({ as, styleVariant, children, fontWeight, italic = false, className, ...props }, ref) => {
    const Component = variantToElement[as] as React.ElementType

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[as],
          styleVariants[styleVariant],
          fontWeight && fontWeightVariants[fontWeight],
          italic && 'italic',
          className
        )}
        title
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'
