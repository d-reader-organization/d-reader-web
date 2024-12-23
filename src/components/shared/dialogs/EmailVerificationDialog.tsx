import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { CommonDialogProps } from '@/models/common'
import { toast } from '@/components/ui/toast'
import { requestUserEmailVerification } from '@/app/lib/api/user/mutations'

export const EmailVerificationDialog: React.FC<CommonDialogProps> = ({ open, toggleDialog }) => (
  <Dialog open={open} onOpenChange={toggleDialog}>
    <DialogContent className='sm:max-w-[444px] p-4 text-lg bg-grey-600'>
      <strong>📖 Email not verified</strong>
      Verify your email to be eligible for a free mint
      <small>Didn&apos;t get the email? check your spam folder{/* before resending */}</small>
      <Button
        className='justify-start pl-0'
        onClick={async () => {
          const error = await requestUserEmailVerification()
          toast({
            description: error || 'Verification email sent, check your inbox!',
            variant: error ? 'error' : 'success',
          })
          toggleDialog()
        }}
        variant='outline'
      >
        Resend email confirmation link
      </Button>
    </DialogContent>
  </Dialog>
)
