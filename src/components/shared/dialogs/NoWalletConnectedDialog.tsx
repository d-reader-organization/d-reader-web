'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'
import { Text } from '@/components/ui/Text'

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

/** @deprecated - invalid UI components */
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
        <DialogDescription>You need to connect your wallet first.</DialogDescription>

        <DialogFooter className='justify-center'>
          <BaseWalletMultiButtonDynamic />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
