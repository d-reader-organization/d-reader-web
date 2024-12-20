'use client'

import React from 'react'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/Form'
import { updateUserValidationSchema } from '@/constants/schemas'
import { updateUser } from '@/app/lib/api/user/mutations'
import { UpdateUserData } from '@/models/user'
import { Text, toast } from '../ui'
import { useToggle } from '@/hooks'
import { useRouter } from 'next/navigation'
import { Divider } from '../shared/Divider'

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
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <Text as='p' styleVariant='body-normal' className='font-bold'>
            Display Name
          </Text>
          <div className='flex justify-between items-center'>
            <Text as='p' styleVariant='body-normal'>
              {name}
            </Text>
            <Button variant='secondary' size='md'>
              Edit
            </Button>
          </div>

          {/* <Input
              {...form.register('name')}
              placeholder={name}
              className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
            /> */}
        </div>
        <Divider />

        <div className='flex flex-col'>
          <Text as='p' styleVariant='body-normal' className='font-bold'>
            Username
          </Text>
          <div className='flex justify-between items-center'>
            <Text as='p' styleVariant='body-normal'>
              @{name}
            </Text>
            <Button variant='secondary' size='md'>
              Edit
            </Button>
          </div>

          {/* <Input
            {...form.register('name')}
            placeholder={name}
            className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
          />*/}
        </div>
        <Divider />

        <div className='flex flex-col'>
          <Text as='p' styleVariant='body-normal' className='font-bold'>
            Email
          </Text>
          <div className='flex justify-between items-center'>
            <Text as='p' styleVariant='body-normal'>
              {email}
            </Text>
            <Button variant='secondary' size='md'>
              Edit
            </Button>
          </div>

          {/* <Input
            {...form.register('email')}
            placeholder={email}
            className='bg-grey-300 border-grey-200 border rounded-md p-2 w-full'
          />*/}
        </div>
      </div>
    </Form>
  )
}
