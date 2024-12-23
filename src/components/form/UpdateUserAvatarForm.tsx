'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl } from '../ui/Form'
import { updateUserAvatarValidationSchema } from '@/constants/schemas'
import { UpdateUserAvatarData } from '@/models/user'
import { removeUserProfilePhoto, updateUserAvatar } from '@/app/lib/api/user/mutations'
import { Text, toast } from '../ui'
import FileUpload from '../shared/FileUpload'
import { useRouter } from 'next/navigation'
import { useToggle } from '@/hooks'

type Props = {
  id: string | number
  avatar: string
}

export const UpdateUserAvatarForm: React.FC<Props> = ({ id, avatar }) => {
  const [showChangePhotoLoader, toggleChangePhotoLoader] = useToggle()
  const [showRemovePhotoLoader, toggleRemovePhotoLoader] = useToggle()

  const form = useForm<z.infer<typeof updateUserAvatarValidationSchema>>({
    resolver: zodResolver(updateUserAvatarValidationSchema),
    defaultValues: {
      avatar,
    },
  })

  const { refresh } = useRouter()
  const handleAvatarUpdateFormSubmit = async (data: UpdateUserAvatarData) => {
    toggleChangePhotoLoader()
    if (data.avatar) {
      const formData = new FormData()
      formData.append('avatar', data.avatar)

      const { errorMessage } = await updateUserAvatar(id, formData)

      if (errorMessage) {
        toast({ description: errorMessage, variant: 'error' })
      } else {
        toast({ description: 'Photo has been updated successfully!', variant: 'success' })
        refresh()
      }
    }
    toggleChangePhotoLoader()
  }

  const handleRemoveAvatar = async () => {
    toggleRemovePhotoLoader()
    const { errorMessage } = await removeUserProfilePhoto(id)
    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
    } else {
      toast({ description: 'Photo has been removed successfully!', variant: 'success' })
      refresh()
    }
    toggleRemovePhotoLoader()
  }

  return (
    <Form {...form}>
      <form>
        <div className='flex flex-col justify-between gap-8'>
          <div className='flex flex-col gap-2'>
            <Text as='p' styleVariant='body-normal' className='font-bold'>
              Profile photo
            </Text>

            <Text as='p' styleVariant='body-small' className='text-grey-200'>
              Recommended image size: 500 x 500
            </Text>
          </div>

          <div className='flex justify-between items-center'>
            <FormControl>
              <FileUpload
                id='avatar'
                onUpload={(files) => {
                  if (files[0]?.file) {
                    form.setValue('avatar', files[0].file)
                    form.handleSubmit(handleAvatarUpdateFormSubmit)()
                  }
                }}
                onRemove={() => handleRemoveAvatar()}
                previewUrl={avatar ?? null}
                isUploading={showChangePhotoLoader}
                isRemoving={showRemovePhotoLoader}
              />
            </FormControl>
          </div>
        </div>
      </form>
    </Form>
  )
}
