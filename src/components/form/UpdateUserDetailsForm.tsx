'use client'

import React from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormItem, FormLabel } from '../ui/Form'
import { updateUserValidationSchema } from '@/constants/schemas'
import { updateUser } from '@/app/lib/api/user/mutations'
import { UpdateUserData } from '@/models/user'
import { Text, toast } from '../ui'
import { Loader } from '../shared/Loader'
import { useToggle } from '@/hooks'
import { useRouter } from 'next/navigation'

type Props = {
  id: number | string
  name: string
  email: string
}

export const UpdateUserDetailsForm: React.FC<Props> = ({ id, name, email }) => {
  const [showLoader, toggleLoader] = useToggle()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof updateUserValidationSchema>>({
    resolver: zodResolver(updateUserValidationSchema),
    defaultValues: { email, name },
  })

  const handleProfileUpdate = async (data: UpdateUserData) => {
    toggleLoader()
    const { errorMessage } = await updateUser(id, data)

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
    } else {
      toast({ description: 'Profile details updated !', variant: 'success' })
      refresh()
    }
    toggleLoader()
  }

  return (
    <Form {...form}>
      <div className='text-gray-400 border-b border-gray-400 text-sm font-bold uppercase pb-1'>Basic details</div>
      <form onSubmit={form.handleSubmit(handleProfileUpdate)} className='flex flex-col gap-4 max-w-[400px]'>
        <FormItem>
          <FormLabel className='font-bold'>Email</FormLabel>
          <Text as='p' styleVariant='body-small'>
            If changed, verification email will be sent to the new address
          </Text>
          <Input
            {...form.register('email')}
            placeholder={email}
            className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
          />
        </FormItem>

        <FormItem>
          <FormLabel className='font-bold'>Username</FormLabel>
          <Text as='p' styleVariant='body-small'>
            Must be 3 to 20 characters long. Leters, numbers, underscores, and dashes are allowed
          </Text>
          <Input
            {...form.register('name')}
            placeholder={name}
            className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
          />
        </FormItem>

        <Button type='submit' variant='secondary' subVariant={2} className='w-fit '>
          {showLoader ? <Loader /> : 'Save'}
        </Button>
      </form>
    </Form>
  )
}
