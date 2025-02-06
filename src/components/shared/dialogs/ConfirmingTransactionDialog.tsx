import { CommonDialogProps } from '@/models/common'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'

export const ConfirmingTransactionDialog: React.FC<CommonDialogProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby=''
        className='bg-grey-600 rounded:[32px] sm:rounded-[64px] flex flex-col items-center max-w-[400px]'
        overlayClassName='bg-grey-500'
        hideCloseIcon
      >
        <DialogTitle className='sr-only'>Confirming transaction...</DialogTitle>
        <video className='max-h-[300px] max-w-[300px] h-full w-full' autoPlay loop muted>
          <source src='/assets/animations/confirm-transaction.mp4' type='video/mp4' />
          Confirming transaction...
        </video>
      </DialogContent>
    </Dialog>
  )
}
