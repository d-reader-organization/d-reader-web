'use client'

import { ShareIcon } from '@/components/icons/theme/ShareIcon'
import { Button, toast } from '@/components/ui'
import React from 'react'

interface Props {
  title?: string
  text?: string
}

export const ShareButton: React.FC<Props> = ({ title = '', text = '' }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.toString(),
        })
      } catch (err) {
        console.error('Error sharing content: ', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.toString())
      toast({ description: 'Copied to clipboard!', variant: 'success' })
    }
  }

  return <Button onClick={handleShare} Icon={ShareIcon} iconOnly variant='secondary' />
}
