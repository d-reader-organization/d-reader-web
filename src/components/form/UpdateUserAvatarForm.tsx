'use client'

import React, { useRef } from 'react'
import { removeUserProfilePhoto } from '@/app/lib/api/user/mutations'
import { Text } from '../ui/Text'
import { toast } from '../ui/toast'
import FileUpload from '../shared/FileUpload'
import { useToggle } from '@/hooks'
import { RemovePhotoWarningDialog } from '../shared/dialogs/RemovePhotoWarningDialog'
import { FileUploadRef } from '@/lib/types'
import { updateUserAvatarAction } from '@/app/lib/actions/update-user-avatar'
import { useRouter } from 'next/navigation'

type Props = {
  id: string | number
  avatar: string
}

export const UpdateUserAvatarForm: React.FC<Props> = ({ id, avatar }) => {
  const [showChangePhotoLoader, toggleChangePhotoLoader] = useToggle()
  const [showRemovePhotoLoader, toggleRemovePhotoLoader] = useToggle()
  const [showRemovePhotoWarningDialog, toggleRemovePhotoWarningDialog, closeRemovePhotoWarningDialog] = useToggle()
  const ref = useRef<FileUploadRef>(null)
  const { refresh } = useRouter()

  const handleRemoveAvatar = async () => {
    toggleRemovePhotoLoader()
    const { errorMessage } = await removeUserProfilePhoto(id)

    if (ref.current) {
      ref.current.reset()
    }

    if (errorMessage) {
      toast({ description: errorMessage, variant: 'error' })
    } else {
      toast({ description: 'Photo has been removed successfully!', variant: 'success' })
    }
    toggleRemovePhotoLoader()
    closeRemovePhotoWarningDialog()
  }

  return (
    <>
      <form>
        <div className='flex flex-col justify-between gap-8'>
          <div className='flex flex-col gap-2'>
            <Text as='p' styleVariant='body-normal' className='font-bold'>
              Avatar
            </Text>

            <Text as='p' styleVariant='body-small' className='text-grey-200'>
              Recommended image size: 500 x 500
            </Text>
          </div>

          <div className='flex justify-between items-center'>
            <FileUpload
              id='avatar'
              name='avatar'
              onUpload={async (files) => {
                if (files[0]?.file) {
                  toggleChangePhotoLoader()
                  const formData = new FormData()
                  formData.set('avatar', files[0].file)
                  const response = await updateUserAvatarAction(id, null, formData)
                  toggleChangePhotoLoader()
                  if (!response?.success && response?.error) {
                    toast({ variant: 'error', description: response.error })
                    return
                  }
                  refresh()
                  toast({ variant: 'success', description: 'Your photo has been changed' })
                }
              }}
              onRemove={toggleRemovePhotoWarningDialog}
              previewUrl={avatar ?? null}
              isUploading={showChangePhotoLoader}
              isRemoving={showRemovePhotoLoader}
              ref={ref}
            />
          </div>
        </div>
      </form>
      <RemovePhotoWarningDialog
        open={showRemovePhotoWarningDialog}
        toggleDialog={closeRemovePhotoWarningDialog}
        isLoading={showRemovePhotoLoader}
        removePhoto={handleRemoveAvatar}
      />
    </>
  )
}
