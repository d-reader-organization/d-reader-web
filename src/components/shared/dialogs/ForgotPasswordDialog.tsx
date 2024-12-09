'use client'

import { ForgotPasswordForm } from '@/components/form/ForgotPasswordForm'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import useToggle from '@/hooks/useToggle'

export const ForgotPasswordDialog: React.FC = () => {
  const [passwordDialogOpen, togglePasswordDialog] = useToggle()
  return (
    <Dialog open={passwordDialogOpen} onOpenChange={togglePasswordDialog}>
      <DialogTrigger asChild>
        <Button className='self-start text-grey-100 p-0 py-2 pr-2 w-fit hover:brightness-150' variant='ghost'>
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[444px] p-0 '>
        <DialogHeader className='p-4'>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            Type in your email address to send password reset instructions to your mail inbox. Make sure to check your
            spam folder!
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm onClose={togglePasswordDialog} />
      </DialogContent>
    </Dialog>
  )
}
