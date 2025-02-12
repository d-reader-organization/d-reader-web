'use client'

import React from 'react'
import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import { rateComic } from '@/app/lib/api/comic/mutations'
import { rateComicIssue } from '@/app/lib/api/comicIssue/mutations'
import { CommonDialogProps } from '@/models/common'
import { toast } from '@/components/ui/toast'
import { StarIcon } from '@/components/icons/theme/StarIcon'
import { Button } from '@/components/ui/Button'

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
      <DialogContent className='max-w-sm' aria-describedby=''>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Rate the comic
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tap a star to give a rating!
          <div className='flex justify-center gap-3 mt-2 mb-4 [&>*]:text-yellow-300'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                Icon={StarIcon}
                iconOnly
                variant='inline'
                className='text-yellow-300'
                iconClassName='size-8'
                onClick={() => handleStarClick(star)}
                solid={!!(rating && rating >= star)}
              />
            ))}
          </div>
        </DialogDescription>

        <DialogFooter>
          <DialogButton variant='secondary' onClick={toggleDialog}>
            Cancel
          </DialogButton>
          <DialogButton variant='white' onClick={handleSubmit}>
            OK
          </DialogButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
