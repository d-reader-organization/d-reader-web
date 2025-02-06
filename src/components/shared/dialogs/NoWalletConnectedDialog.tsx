'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'
import { Text } from '@/components/ui/Text'

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

export const NoWalletConnectedDialog: React.FC<CommonDialogProps> = ({ open, toggleDialog }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='max-w-md' hideCloseIcon>
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              ⚠️ Wallet not connected
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='flex flex-col gap-2 w-full'>
          You need to connect your wallet first.
        </DialogDescription>
        <div className='flex w-full justify-center gap-2 mt-4'>
          <BaseWalletMultiButtonDynamic />
        </div>
      </DialogContent>
    </Dialog>
  )
}
