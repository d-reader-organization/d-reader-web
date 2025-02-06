'use client'

import React, { useActionState, useEffect } from 'react'
import { Text } from '@/components/ui/Text'
import { toast } from '@/components/ui/toast'
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
import { LockIcon } from '@/components/icons/theme/LockIcon'
import { useFormStatus } from 'react-dom'
import { requestPasswordResetAction } from '@/app/lib/actions/auth/request-password-reset'
import { onSubmitPreventFormListener } from '@/app/lib/utils/submitFormWithPreventDefault'
import { Input } from '@/components/ui/Input'

type Props = {
  trigger?: React.ReactNode
}

export const ForgotPasswordDialog: React.FC<Props> = ({ trigger }) => {
  const [passwordDialogOpen, togglePasswordDialog] = useToggle()
  const [state, action] = useActionState(requestPasswordResetAction, null)
  const { pending } = useFormStatus()

  useEffect(() => {
    if (!state) return
    else if (state.error) {
      toast({
        description: state.error,
        variant: 'error',
      })
    } else if (state.success) {
      toast({ title: 'Password reset instructions sent to your inbox!' })
    }
  }, [state])

  return (
    <Dialog open={passwordDialogOpen} onOpenChange={togglePasswordDialog}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            className='flex self-start p-0 py-2 pr-2 pl-0 sm:pl-0 w-fit hover:brightness-150 text-important-color font-medium'
            variant='ghost'
            Icon={LockIcon}
            iconClassName='text-important-color'
          >
            Forgot Password?
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader className='p-4'>
          <DialogTitle asChild>
            <Text styleVariant='primary-heading' as='h3'>
              Reset password
            </Text>
          </DialogTitle>
          <DialogDescription>
            Type in your email and we&apos;ll send password reset instructions to your inbox. Check your spam folder!
          </DialogDescription>
        </DialogHeader>

        <form action={action} onSubmit={onSubmitPreventFormListener(action)}>
          <Input className='w-full mb-4' name='nameOrEmail' placeholder='john.doe@dreader.io' />

          <div className='flex w-full gap-2 mt-4'>
            <Button variant='secondary' className='w-full' type='button' onClick={togglePasswordDialog}>
              Cancel
            </Button>
            <Button variant='white' className='w-full' type='submit' disabled={pending}>
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
