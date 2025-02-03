'use client'

import { useCallback } from 'react'
import { CopyIcon } from '@/components/icons/theme/CopyIcon'
import { Button, ButtonProps } from '@/components/ui/Button'
import { toast } from '@/components/ui/toast'

type CopyButtonProps = {
  clipboard: string
  variant: 'inline' | 'button'
} & Omit<ButtonProps, 'onClick' | 'variant'>

export const CopyButton: React.FC<CopyButtonProps> = ({ clipboard, variant, ...props }) => {
  const handleClick = useCallback(() => {
    if (clipboard) {
      navigator.clipboard.writeText(clipboard)
      toast({ description: 'Copied to clipboard' })
    }
  }, [clipboard])

  const buttonVariant = variant === 'inline' ? 'inline' : 'secondary'

  return <Button variant={buttonVariant} Icon={CopyIcon} iconOnly onClick={handleClick} {...props} />
}
