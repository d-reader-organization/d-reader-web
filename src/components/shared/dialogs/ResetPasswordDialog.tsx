'use client'

import { ForgotPasswordForm } from '@/components/form/ForgotPasswordForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'

export const ResetPasswordDialog: React.FC<CommonDialogProps> = ({ open, toggleDialog }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='sm:max-w-[444px] p-0 '>
        <DialogHeader className='p-4'>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            Type in your email address to send password reset instructions to your mail inbox. Make sure to check your
            spam folder!
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm onClose={toggleDialog} />
      </DialogContent>
    </Dialog>
  )
}
