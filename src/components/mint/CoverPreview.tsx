'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/Dialog'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import Image from 'next/image'
import { RarityChip } from '../shared/chips/RarityChip'
import { Arrow } from '../shared/Arrow'
import { CandyMachine } from '@/models/candyMachine'
import { Nullable } from '@/models/common'
import { InfoStats } from '../shared/InfoStats'

type Props = {
  cover: StatelessCover
  candyMachine: Nullable<CandyMachine> | undefined
  hideArrows: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  onPrevClick: () => void
  onNextClick: () => void
}

export const CoverPreviewDialog: React.FC<Props> = ({
  cover,
  hideArrows,
  open,
  candyMachine,
  onOpenChange,
  onPrevClick,
  onNextClick,
}) => {
  const getRaritySupply = (totalSupply: number, rarityShare: number) => {
    const supply = Math.floor((totalSupply * rarityShare) / 100)
    return supply
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='bg-transparent shadow-none p-4 flex gap-4 items-center sm:max-w-[520px]'
        overlayClassName='bg-grey-600 bg-opacity-60 backdrop-blur-[20px]'
        showCloseIcon={false}
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Cover Preview</DialogTitle>
        {hideArrows ? null : <Arrow arrowOrientation='LEFT' className='bg-transparent' onClick={onPrevClick} />}
        <div className='flex flex-col gap-[42px] rounded-2xl'>
          <Image
            src={cover.image}
            alt={cover.rarity + ' cover'}
            className='shadow-[6px_6px_0px_0px_#000] rounded-2xl w-full max-h-[calc(100vh-200px)]'
            height={520}
            width={520}
          />
          <div className='flex justify-between'>
            <div className='flex gap-[42px]'>
              {candyMachine ? (
                <InfoStats title='Supply' value={getRaritySupply(candyMachine.supply, cover.share)} />
              ) : (
                <InfoStats title='Supply' value={cover.share + ' %'} />
              )}
              <InfoStats title='Cover artist' value={cover.artist} />
            </div>
            <RarityChip rarity={cover.rarity} />
          </div>
        </div>
        {hideArrows ? null : <Arrow arrowOrientation='RIGHT' className='bg-transparent' onClick={onNextClick} />}
      </DialogContent>
    </Dialog>
  )
}
