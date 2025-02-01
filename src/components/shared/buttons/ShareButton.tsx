'use client'

import { Button, toast } from '@/components/ui'
import { Share2 } from 'lucide-react'
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
      await navigator.clipboard.writeText(window.location.toString())
      toast({ description: 'Copied to clipboard!', variant: 'success' })
    }
  }

  return <Button onClick={handleShare} Icon={Share2} iconOnly variant='secondary' />
}
