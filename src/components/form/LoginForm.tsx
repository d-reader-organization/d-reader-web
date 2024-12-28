'use client'

import { Button, Input, Label, toast } from '@/components/ui'
import React, { Suspense, useEffect } from 'react'
import { loginAction } from '@/app/lib/actions/auth/login'
import { useFormState, useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { REDIRECT_TO_KEY } from '@/constants/general'
import { Loader } from '../shared/Loader'
import { FormErrorMessage } from './FormErrorMessage'

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button size='lg' className='w-full max-sm:h-[42px]' type='submit' aria-disabled={pending}>
      {pending ? <Loader /> : <p>Login</p>}
    </Button>
  )
}

const Form: React.FC = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(REDIRECT_TO_KEY)
  const [state, action] = useFormState(loginAction.bind(null, redirectTo), null)

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    }
  }, [state?.error])

  return (
    <form action={action} className='space-y-4'>
      <div className='space-y-6'>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Email or username</Label>
          <Input className='max-w-md' placeholder='john.doe@dreader.io' name='nameOrEmail' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <Input className='max-w-md' placeholder='********' type='password' name='password' />
        </div>
        {!state?.success && <FormErrorMessage message={state?.error} />}
      </div>
      <SubmitButton />
    </form>
  )
}

export const LoginForm: React.FC = () => (
  <Suspense>
    <Form />
  </Suspense>
)
