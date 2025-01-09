'use client'

import React, { useActionState, useEffect } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useFormStatus } from 'react-dom'
import { requestPasswordResetAction } from '@/app/lib/actions/auth/request-password-reset'
import { toast } from '../ui/toast'

type Props = {
  onClose: () => void
}

export const ForgotPasswordForm: React.FC<Props> = ({ onClose }) => {
  const [state, action] = useActionState(requestPasswordResetAction, null)

  useEffect(() => {
    if (!state) {
      return
    }
    if (state.error) {
      toast({
        description: state.error,
        variant: 'error',
      })
      return
    }
    if (state.success) {
      toast({
        title: 'Password reset instructions sent to your inbox!',
      })
    }
  }, [state])

  return (
    <form action={action}>
      <Input className='w-full m-4' name='nameOrEmail' placeholder='john.doe@dreader.io' />
      <div className='flex w-full border-t-2 border-grey-600'>
        <Button
          className='p-4 w-full border-r-2 border-grey-600 rounded-r-none'
          onClick={onClose}
          type='button'
          variant='ghost'
        >
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  )
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='p-4 w-full rounded-l-none' type='submit' disabled={pending} variant='ghost'>
      Send
    </Button>
  )
}
