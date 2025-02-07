'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { StarIconButton } from '../buttons/StarIconButton'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import { rateComic } from '@/app/lib/api/comic/mutations'
import { rateComicIssue } from '@/app/lib/api/comicIssue/mutations'
import { CommonDialogProps } from '@/models/common'
import { toast } from '@/components/ui/toast'

type Props = {
  comicIssueId?: number
  comicSlug?: string
} & CommonDialogProps

export const StarRatingDialog: React.FC<Props> = ({ comicIssueId, comicSlug, toggleDialog, open }) => {
  const [rating, setRating] = React.useState<number | null>(null)
  const { refresh } = useRouter()

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleClose = () => {
    setRating(null)
    toggleDialog()
  }

  const handleSubmit = async () => {
    if (!rating) return

    let errorMessage = ''
    if (comicSlug) {
      errorMessage = await rateComic({
        slug: comicSlug,
        request: { rating },
      })
    } else if (comicIssueId) {
      errorMessage = await rateComicIssue({
        id: comicIssueId,
        request: { rating },
      })
    }
    handleClose()
    toast({
      description: !!errorMessage ? errorMessage : comicSlug ? 'Comic rated' : 'Comic issue rated!',
      variant: !!errorMessage ? 'error' : 'success',
    })
    refresh()
  }

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='max-w-sm' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Rate the comic
            </Text>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center'>
          Tap a star to give a rating!
          <div className='flex justify-center gap-3 mt-4 [&>*]:text-yellow-300'>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIconButton
                style={{ cursor: 'pointer' }}
                size='xl'
                key={star}
                onClick={() => handleStarClick(star)}
                solid={!!(rating && rating >= star)}
              />
            ))}
          </div>
        </div>
        <div className='flex w-full gap-2 mt-4'>
          <Button variant='secondary' className='w-full' type='button' onClick={toggleDialog}>
            Cancel
          </Button>
          <Button variant='white' className='w-full' onClick={handleSubmit}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
