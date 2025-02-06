'use client'

import React from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormItem, FormLabel } from '../ui/Form'
import { updateUserPasswordValidationSchema } from '@/constants/schemas'
import { UpdateUserPassword } from '@/models/user'
import { updateUserPassword } from '@/app/lib/api/user/mutations'
import { Text, toast } from '../ui'
import { useToggle } from '@/hooks'
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { ForgotPasswordDialog } from '../shared/dialogs/ForgotPasswordDialog'

type Props = {
  id: string | number
}

export const UpdatePasswordForm: React.FC<Props> = ({ id }) => {
  const [isLoading, toggleLoading] = useToggle()

  const form = useForm<z.infer<typeof updateUserPasswordValidationSchema>>({
    resolver: zodResolver(updateUserPasswordValidationSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const handleUpdatePassword = async (data: UpdateUserPassword) => {
    toggleLoading()
    const { errorMessage } = await updateUserPassword(id, data)

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
    } else {
      toast({ description: 'Password updated successfully!', variant: 'success' })
    }
    toggleLoading()
  }

  return (
    <Form {...form}>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Text as='h4' styleVariant='secondary-heading'>
            Change Password
          </Text>
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 max-w-[486px]'>
            Your new password must be different your current password.
          </Text>
        </div>

        <form onSubmit={form.handleSubmit(handleUpdatePassword)} className='flex flex-col gap-10 w-full'>
          <div className='flex flex-col gap-4'>
            <FormItem>
              <FormLabel className='font-bold'>Current Password</FormLabel>
              <FormControl>
                <Input
                  {...form.register('oldPassword')}
                  type='password'
                  placeholder='********'
                  className='max-w-[486px]'
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className='font-bold'>New Password</FormLabel>
              <FormControl>
                <Input
                  {...form.register('newPassword')}
                  type='password'
                  placeholder='********'
                  className='max-w-[486px]'
                />
              </FormControl>
              {/* TODO: refactor form inputs (UpdateUserDetailsForm) */}
              {/* {!state?.success && <FormErrorMessage message={state?.error} />} */}
              <Text as='p' styleVariant='body-small' className='text-grey-200'>
                8 characters minimum. At least 1 lowercase, 1 uppercase and 1 number
              </Text>
            </FormItem>
          </div>

          <Button type='submit' variant='white' size='md' className='w-fit'>
            {isLoading ? <LoaderIcon /> : 'Reset Password'}
          </Button>
        </form>
        <ForgotPasswordDialog />
      </div>
    </Form>
  )
}
