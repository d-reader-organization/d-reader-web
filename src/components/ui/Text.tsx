import React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'li'
type StyleVariant = 'lead' | 'muted'

type TextProps = {
  as: Variant
  styleVariant?: StyleVariant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  h1: 'scroll-m-20 text-4xl font-bold tracking-wide',
  h2: 'mt-10 scroll-m-20 text-3xl font-semibold tracking-wide transition-colors first:mt-0',
  h3: 'mt-2 scroll-m-20 text-2xl font-semibold tracking-wide',
  h4: 'scroll-m-20 text-xl font-semibold tracking-wide',
  p: 'leading-normal text-text-color tracking-wide',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  li: 'my-6 ml-6 list-disc mt-2',
}

const styleVariants: Record<StyleVariant, string> = {
  lead: 'text-xl text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
}

export const Text: React.FC<TextProps> = ({ as: Component, styleVariant, className, children }) => {
  return (
    <Component className={cn(variantStyles[Component], styleVariant ? styleVariants[styleVariant] : '', className)}>
      {children}
    </Component>
  )
}
