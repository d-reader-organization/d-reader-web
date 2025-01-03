'use client'

import { ForgotPasswordForm } from '@/components/form/ForgotPasswordForm'
import { Text } from '@/components/ui'
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
import LockIcon from 'public/assets/vector-icons/filled-lock-icon.svg'

export const ForgotPasswordDialog: React.FC = () => {
  const [passwordDialogOpen, togglePasswordDialog] = useToggle()
  return (
    <Dialog open={passwordDialogOpen} onOpenChange={togglePasswordDialog}>
      <DialogTrigger asChild>
        <Button
          className='flex self-start text-grey-100 p-0 py-2 pr-2 pl-0 sm:pl-0 w-fit hover:brightness-150'
          variant='ghost'
        >
          <LockIcon className='scale-75 text-important-color' />
          <Text as='span' styleVariant='body-small' className='text-important-color font-medium'>
            Forgot Password?
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-sm p-0'>
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
