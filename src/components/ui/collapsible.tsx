'use client'

import { cn } from '@/lib/utils'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import React from 'react'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

interface CollapsibleContentProps {
  animate?: boolean
}

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> & CollapsibleContentProps
>(({ className, animate = true, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'overflow-hidden',
      animate && 'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
      className
    )}
    {...props}
  />
))
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
