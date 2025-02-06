'use client'

import { Button, Input, Label, toast } from '@/components/ui'
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { resetPasswordAction } from '@/app/lib/actions/auth/reset-password'
import { FormErrorMessage } from './FormErrorMessage'
import { findError } from '@/lib/forms'
import { onSubmitPreventFormListener } from '@/app/lib/utils/submitFormWithPreventDefault'

type Props = {
  verificationToken: string
}

export const ResetPasswordForm: React.FC<Props> = ({ verificationToken }) => {
  const [state, action] = useActionState(resetPasswordAction.bind(null, verificationToken), null)
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
    <form action={action} onSubmit={onSubmitPreventFormListener(action)} className='flex flex-col items-center gap-4'>
      <div className='flex flex-col'>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <FormErrorMessage message={findError(state?.errors, 'newPassword')} />
          <Input placeholder='********' name='newPassword' type='password' />
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
    <Button
      Icon={pending ? LoaderIcon : undefined}
      size='lg'
      className='w-fit min-w-36 px-10'
      type='submit'
      aria-disabled={pending}
    >
      {pending ? '' : 'Update'}
    </Button>
  )
}
