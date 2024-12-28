'use client'

import { Button, Input, Label, toast } from '@/components/ui'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Loader } from '../shared/Loader'
import { resetPasswordAction } from '@/app/lib/actions/auth/reset-password'
import { FormErrorMessage } from './FormErrorMessage'
import { findError } from '@/lib/forms'

type Props = {
  verificationToken: string
}

export const ResetPasswordForm: React.FC<Props> = ({ verificationToken }) => {
  const [state, action] = useFormState(resetPasswordAction.bind(null, verificationToken), null)
  React.useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    } else if (state?.success) {
      toast({
        title: 'Success',
        description: `Password reset successful!`,
        variant: 'success',
      })
    }
  }, [state?.error, state?.success])

  return (
    <form action={action} className='flex flex-col items-center gap-4'>
      <div className='flex flex-col'>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <FormErrorMessage message={findError(state?.errors, 'newPassword')} />
          <Input className='max-w-md' placeholder='********' name='newPassword' type='password' />
        </div>
        {!state?.success && <FormErrorMessage message={state?.error} />}
      </div>
      <SubmitButton />
    </form>
  )
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button size='lg' className='w-fit min-w-36 px-10' type='submit' aria-disabled={pending}>
      {pending ? <Loader /> : <p>Update</p>}
    </Button>
  )
}
