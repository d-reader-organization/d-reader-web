'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/Dialog'
import { UnwrapIssueDialogItem } from '@/components/comicIssue/UnwrapIssueDialogItem'
import { useToggle } from '@/hooks/useToggle'
import { Text } from '@/components/ui'
import { CollectibleComic } from '@/models/asset'

type Props = {
  collectibleComics: CollectibleComic[]
  showUnwrapButton?: boolean
}

export const UnwrapIssueDialog: React.FC<Props> = ({ collectibleComics, showUnwrapButton = true }) => {
  const [unwrapIssueDialog, toggleDialog, closeDialog] = useToggle()
  const unusedCollectibleComics = collectibleComics.filter((collectibleComic) => !collectibleComic.isUsed)
  return (
    <Dialog open={unwrapIssueDialog} onOpenChange={toggleDialog}>
      {showUnwrapButton && (
        <DialogTrigger className='bg-yellow-300 rounded-lg text-black p-2 font-semibold text-base min-w-28 w-min mx-auto'>
          Unwrap
        </DialogTrigger>
      )}
      <DialogContent aria-describedby='' className='max-w-md max-h-[480px]'>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Unwrap a comic
            </Text>
          </DialogTitle>
          <DialogDescription>
            In order to read the full episode, you need to have at least one digital copy opened. This action is
            irreversible and will make the selected copy lose its mint condition.
          </DialogDescription>
        </DialogHeader>

        {/* TODO: improve this dialog somehow, and sort the available comics by rarity? */}
        {unusedCollectibleComics.map((collectibleComic) => (
          <UnwrapIssueDialogItem
            key={collectibleComic.address}
            collectibleComic={collectibleComic}
            closeDialog={closeDialog}
          />
        ))}
      </DialogContent>
    </Dialog>
  )
}
