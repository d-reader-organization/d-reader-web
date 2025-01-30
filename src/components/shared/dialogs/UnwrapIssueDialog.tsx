'use client'

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/Dialog'
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
      <DialogContent
        aria-describedby=''
        className='flex flex-col justify-between items-center gap-4 bg-grey-400 p-5 rounded-lg max-w-[500px] max-h-[600px] overflow-y-scroll'
      >
        <DialogTitle className='sr-only'>Unwrap issue dialog</DialogTitle>
        <Text as='h3' styleVariant='primary-heading'>
          Choose to open
        </Text>
        <Text as='p' styleVariant='body-large' className='text-center'>
          This episode is a digital collectible, In order to read the full episode you need to &quot;unwrap&quot; at
          least one copy. This action is irreversible and will make the selected copy lose the mint condition.
        </Text>
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
