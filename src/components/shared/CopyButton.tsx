'use client'

import { useCallback } from 'react'
import { CopyIcon } from '@/components/icons/theme/CopyIcon'
import { Button, ButtonProps } from '@/components/ui/Button'
import { toast } from '@/components/ui/toast'

type CopyButtonProps = {
  clipboard: string
  text?: string
} & Omit<ButtonProps, 'onClick'>

export const CopyButton: React.FC<CopyButtonProps> = ({ clipboard, text, variant, ...props }) => {
  const handleClick = useCallback(() => {
    if (clipboard) {
      navigator.clipboard.writeText(clipboard)
      toast({ description: 'Copied to clipboard' })
    }
  }, [clipboard])

  return (
    <Button variant={variant} Icon={CopyIcon} onClick={handleClick} solid={false} {...props}>
      {text || ''}
    </Button>
  )
}
