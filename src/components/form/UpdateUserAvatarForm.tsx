'use client'

import React from 'react'
import { Button } from '../ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormLabel } from '../ui/Form'
import { updateUserAvatarValidationSchema } from '@/constants/schemas'
import { UpdateUserAvatarData } from '@/models/user'
import { updateUserAvatar } from '@/app/lib/api/user/mutations'
import { Text, toast } from '../ui'
import FileUpload from '../shared/FileUpload'
import { useRouter } from 'next/navigation'
import { useToggle } from '@/hooks'
import { Loader } from '../shared/Loader'

type Props = {
  id: string | number
  avatar: string
}

export const UpdateUserAvatarForm: React.FC<Props> = ({ id, avatar }) => {
  const [showLoader, toggleLoader] = useToggle()
  const form = useForm<z.infer<typeof updateUserAvatarValidationSchema>>({
    resolver: zodResolver(updateUserAvatarValidationSchema),
    defaultValues: {
      avatar,
    },
  })

  const { refresh } = useRouter()
  const handleAvatarUpdateFormSubmit = async (data: UpdateUserAvatarData) => {
    toggleLoader()

    if (data.avatar) {
      const formData = new FormData()
      formData.append('avatar', data.avatar)

      const { errorMessage } = await updateUserAvatar(id, formData)

      if (errorMessage) {
        toast({ description: errorMessage, variant: 'error' })
      } else {
        toast({ description: 'Avatar updated !', variant: 'success' })
        refresh()
      }
    }
    toggleLoader()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAvatarUpdateFormSubmit)}>
        <div className='flex flex-col justify-between gap-8'>
          <div className='flex flex-col gap-2'>
            <Text as='p' styleVariant='body-normal' className='font-bold'>
              Profile photo
            </Text>
            <Text as='p' styleVariant='body-small' className='text-grey-200'>
              Recommended size is 500 x 500px, 3mb max size
            </Text>
          </div>
          <div className='flex justify-between items-end'>
            <FormControl>
              <FileUpload
                id='avatar'
                onUpload={(files) => form.setValue('avatar', files[0]?.file)}
                previewUrl={avatar ?? null}
              />
            </FormControl>
            <Button type='submit' variant='secondary' size='md'>
              {showLoader ? <Loader /> : 'Update photo'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
