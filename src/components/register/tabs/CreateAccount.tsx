'use client'

import { registerAction, registerWithGoogleAction } from '@/app/lib/actions/auth/register'
import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '../../ui/Label'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { DividerWithText } from '../../shared/Divider'
import { GoogleSignInButton } from '../../shared/buttons/GoogleSignInButton'
import { Text } from '../../ui/Text'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { TermsOfServiceAndPrivacyPolicy } from '../../shared/TermsOfServiceAndPrivacyText'
import { useToast } from '../../ui/toast/use-toast'
import { LoaderIcon } from '@/components/icons/theme/LoaderIcon'
import { ParsedFormError } from '@/models/common'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { findError } from '@/lib/forms'
import { onSubmitPreventFormListener } from '@/app/lib/utils/submitFormWithPreventDefault'

type Props = { isGoogleSignUp?: boolean; onSuccess: () => void }

const CreateAccountContent: React.FC<Props> = ({ isGoogleSignUp = false, onSuccess }) => (
  <main className='container flex flex-col max-w-sm mb-8'>
    <Text as='h2' styleVariant='primary-heading' className='text-center my-4 sm:my-8'>
      {isGoogleSignUp ? 'Set your details' : 'Welcome!'}
    </Text>
    {isGoogleSignUp ? null : (
      <>
        <GoogleSignInButton buttonText='Sign up with google' />
        <DividerWithText text='or with' />
      </>
    )}
    <RegisterForm isGoogleSignUp={isGoogleSignUp} onSuccess={onSuccess} />
    <Link className='flex justify-center hover:brightness-150 font-semibold mb-4 mt-4 md:mt-2' href={RoutePath.Login}>
      <Text as='p' styleVariant='body-normal' className='text-grey-100'>
        Already have account?&nbsp;
      </Text>
      <Text as='p' styleVariant='body-normal' className='text-important-color'>
        Log In
      </Text>
    </Link>
    <TermsOfServiceAndPrivacyPolicy />
  </main>
)

const RegisterButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' type='submit' size='lg' aria-disabled={pending}>
      {pending ? <LoaderIcon /> : <p>Register</p>}
    </Button>
  )
}

type FormProps = {
  isGoogleSignUp: boolean
  onSuccess: () => void
}

const RegisterForm: React.FC<FormProps> = ({ isGoogleSignUp, onSuccess }) => {
  const formAction = isGoogleSignUp ? registerWithGoogleAction : registerAction
  const [state, action] = useActionState(formAction, null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.success) {
      toast({ title: 'Welcome', description: 'Your account has been created!', variant: 'success' })
      onSuccess()
    }
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    }
  }, [state?.success, state?.error, toast, onSuccess])

  return isGoogleSignUp ? (
    <GoogleForm action={action} />
  ) : (
    <RegularForm action={action} error={state?.error} errors={state?.errors} />
  )
}

type RegisterFormProps = {
  action: (payload: FormData) => void
  error?: string
  errors?: ParsedFormError[]
}

const RegularForm: React.FC<RegisterFormProps> = ({ action, error, errors }) => (
  <form action={action} onSubmit={onSubmitPreventFormListener(action)} className='flex flex-col gap-6'>
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col w-full space-y-2'>
        <Label>Username</Label>
        <FormErrorMessage message={findError(errors, 'name')} />
        <Input placeholder='john-doe' name='name' />
      </div>
      <div className='flex flex-col w-full space-y-2'>
        <Label>Email</Label>
        <FormErrorMessage message={findError(errors, 'email')} />
        <Input placeholder='john.doe@gmail.com' name='email' />
      </div>
      <div className='flex flex-col w-full space-y-2'>
        <Label>Password</Label>
        <FormErrorMessage message={findError(errors, 'password')} />
        <Input placeholder='********' type='password' name='password' />
      </div>
      <FormErrorMessage message={error} />
    </div>
    <RegisterButton />
  </form>
)

const GoogleForm: React.FC<RegisterFormProps> = ({ action, errors }) => (
  <form action={action} onSubmit={onSubmitPreventFormListener(action)} className='flex flex-col gap-6'>
    <Label>Username</Label>
    <FormErrorMessage message={findError(errors, 'name')} />
    <Input placeholder='john-doe' name='name' />
    <RegisterButton />
  </form>
)

export { CreateAccountContent }
