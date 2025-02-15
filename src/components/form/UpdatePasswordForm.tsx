'use client'

import React, { useActionState, useEffect } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Label } from '../ui/Label'
import { Text } from '../ui/Text'
import { toast } from '../ui/toast'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { ForgotPasswordDialog } from '../shared/dialogs/ForgotPasswordDialog'
import { updateUserPasswordAction } from '@/app/lib/actions/auth/update-user-password'
import { FormErrorMessage } from './FormErrorMessage'
import { useFormStatus } from 'react-dom'
import { findError } from '@/lib/forms'
import { cn } from '@/lib/utils'

type Props = {
  id: string | number
}

export const UpdatePasswordForm: React.FC<Props> = ({ id }) => {
  const [state, action] = useActionState(updateUserPasswordAction.bind(null, id), null)

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    }
    if (state?.success) {
      toast({
        description: 'Your password has been changed',
        variant: 'success',
      })
    }
  }, [state?.error, state?.success])

  const oldPasswordError = findError(state?.errors, 'oldPassword')
  const newPasswordError = findError(state?.errors, 'newPassword')

  return (
    <form action={action} className='flex flex-col gap-6 max-w-[750px]'>
      <div className='flex flex-col gap-2'>
        <Text as='h4' styleVariant='secondary-heading'>
          Change Password
        </Text>
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 max-w-[486px]'>
          Your new password must be different your current password.
        </Text>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <Label>Current password</Label>
        <FormErrorMessage message={oldPasswordError} />
        <Input
          placeholder='********'
          name='oldPassword'
          type='password'
          className={cn(!!oldPasswordError && 'border border-red-500')}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <Label>New Password</Label>
        <FormErrorMessage message={newPasswordError} />
        <Input
          placeholder='********'
          name='newPassword'
          type='password'
          className={cn(!!newPasswordError && 'border border-red-500')}
        />
        <Text as='p' styleVariant='body-small' className='text-grey-200'>
          8 characters minimum. At least 1 lowercase, 1 uppercase and 1 number
        </Text>
      </div>
      <SubmitButton />
      <ForgotPasswordDialog />
    </form>
  )
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      Icon={pending ? LoaderIcon : undefined}
      className='min-w-44 w-fit max-sm:h-[42px]'
      type='submit'
      variant='white'
      aria-disabled={pending}
    >
      {pending ? '' : 'Reset Password'}
    </Button>
  )
}
