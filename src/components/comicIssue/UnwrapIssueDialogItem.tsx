'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import useToggle from '@/hooks/useToggle'
import React from 'react'
import { useHandleUnwrap } from '@/hooks/useHandleUnwrap'
import { getRarityIcon } from '@/utils/rarity'
import MintIcon from 'public/assets/vector-icons/mint-icon.svg'
import SignedIcon from 'public/assets/vector-icons/signed-icon.svg'
import { Loader } from '../shared/Loader'
import { UnwrapWarningDialog } from '../shared/dialogs/UnwrapWarningDialog'
import { cn } from '@/lib/utils'
import { ComicRarity } from '@/enums/comicRarity'
import { UnwrapButtonListItem } from '../shared/buttons/UnwrapButtonListItem'
import { LOCAL_STORAGE } from '@/constants/general'
import { Button } from '../ui/Button'
import { CollectibleComic } from '@/models/asset'

type Props = { accessToken: string; collectibleComic: CollectibleComic; closeDialog: VoidFunction }

export const UnwrapIssueDialogItem: React.FC<Props> = ({ accessToken, collectibleComic, closeDialog }) => {
  const [isDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_UNWRAP_HINT_READ, false)
  const [unwrapWarningDialog, toggleUnwrapWarningDialog, closeUnwrapWarningDialog] = useToggle(false)

  const { handleUnwrap, isUnwrapLoading } = useHandleUnwrap({
    collectibleComic,
    onSuccess: () => {
      closeUnwrapWarningDialog()
      closeDialog()
    },
  })

  const traitLabelStyle = `bg-transparent rounded-[4px] border border-solid text-xs flex items-center gap-0.5 [&>svg]:size-3 p-1`
  const unwrapButtonStyle =
    'border border-green-500 bg-transparent cursor-pointer w-20 h-12 text-green-500 rounded-[4px]'

  return (
    <div className='flex justify-between w-full border-t stroke-grey-300 items-end pt-5'>
      <div>
        <p className='text-left font-bold text-lg'>{collectibleComic.name}</p>
        <div className='flex flex-wrap h-5 gap-2 mt-2'>
          {collectibleComic.rarity && (
            <div
              className={cn(
                traitLabelStyle,
                collectibleComic.rarity === ComicRarity.Common && 'border-white',
                collectibleComic.rarity === ComicRarity.Uncommon && 'border-yellow-50',
                collectibleComic.rarity === ComicRarity.Rare && 'border-blue-500',
                collectibleComic.rarity === ComicRarity.Epic && 'border-pink-500',
                collectibleComic.rarity === ComicRarity.Legendary && 'border-purple-500'
              )}
            >
              {getRarityIcon(collectibleComic.rarity)} {collectibleComic.rarity}
            </div>
          )}
          {!collectibleComic.isUsed && (
            <div className={cn(traitLabelStyle, 'border-green-500')}>
              <MintIcon /> Mint
            </div>
          )}
          {collectibleComic.isSigned && (
            <div className={cn(traitLabelStyle, 'border-orange-500')}>
              <SignedIcon /> Signed
            </div>
          )}
        </div>
      </div>
      {isDialogRead ? (
        <Button
          className={unwrapButtonStyle}
          onClick={async () => {
            await handleUnwrap(accessToken)
          }}
        >
          {isUnwrapLoading ? <Loader /> : 'Open'}
        </Button>
      ) : (
        <UnwrapButtonListItem isLoading={isUnwrapLoading} onClick={toggleUnwrapWarningDialog} />
      )}
      <UnwrapWarningDialog
        open={unwrapWarningDialog}
        toggleDialog={toggleUnwrapWarningDialog}
        handleUnwrap={async () => {
          await handleUnwrap(accessToken)
        }}
        isLoading={isUnwrapLoading}
      />
    </div>
  )
}
