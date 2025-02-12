'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import useToggle from '@/hooks/useToggle'
import React from 'react'
import { useHandleUnwrap } from '@/hooks/useHandleUnwrap'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { UnwrapWarningDialog } from '../shared/dialogs/UnwrapWarningDialog'
import { UnwrapButtonListItem } from '../shared/buttons/UnwrapButtonListItem'
import { LOCAL_STORAGE } from '@/constants/general'
import { Button } from '../ui/Button'
import { CollectibleComic } from '@/models/asset'
import { RarityChip } from '../shared/chips/RarityChip'
import { UsedTraitChip } from '../shared/chips/UsedTraitChip'

type Props = { collectibleComic: CollectibleComic; closeDialog: VoidFunction }

export const UnwrapIssueDialogItem: React.FC<Props> = ({ collectibleComic, closeDialog }) => {
  const [isDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_UNWRAP_HINT_READ, false)
  const [unwrapWarningDialog, toggleUnwrapWarningDialog, closeUnwrapWarningDialog] = useToggle(false)

  const { handleUnwrap, isUnwrapLoading } = useHandleUnwrap({
    collectibleComicAddress: collectibleComic.address,
    onSuccess: () => {
      closeUnwrapWarningDialog()
      closeDialog()
    },
  })

  const unwrapButtonStyle =
    'border border-green-500 bg-transparent cursor-pointer w-20 h-12 text-green-500 rounded-[4px]'

  return (
    <div className='flex justify-between w-full border-t stroke-grey-300 items-end pt-5'>
      <div>
        <p className='text-left font-bold text-lg'>{collectibleComic.name}</p>
        <div className='flex flex-wrap h-5 gap-2 mt-2'>
          <RarityChip rarity={collectibleComic.rarity} />
          <UsedTraitChip used={collectibleComic.isUsed} hideSecondaryTrait />
        </div>
      </div>
      {isDialogRead ? (
        <Button
          className={unwrapButtonStyle}
          Icon={isUnwrapLoading ? LoaderIcon : undefined}
          onClick={async () => {
            await handleUnwrap()
          }}
        >
          Open
        </Button>
      ) : (
        <UnwrapButtonListItem isLoading={isUnwrapLoading} onClick={toggleUnwrapWarningDialog} />
      )}
      <UnwrapWarningDialog
        open={unwrapWarningDialog}
        toggleDialog={toggleUnwrapWarningDialog}
        handleUnwrap={async () => {
          await handleUnwrap()
        }}
        isLoading={isUnwrapLoading}
      />
    </div>
  )
}
