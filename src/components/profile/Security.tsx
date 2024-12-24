'use client'

import React from 'react'
import { User } from '@/models/user'
import { UpdatePasswordForm } from '../form/UpdatePasswordForm'
import { Text } from '../ui'
import LockIcon from 'public/assets/vector-icons/filled-lock-icon.svg'
import { useToggle } from '@/hooks'
import { ResetPasswordDialog } from '../shared/dialogs/ResetPasswordDialog'

type Props = {
  user: User
}

export const SecuritySection: React.FC<Props> = ({ user }) => {
  const { id, hasPassword } = user
  const [passwordDialogOpen, togglePasswordDialog] = useToggle()

  return (
    <React.Fragment>
      {hasPassword ? (
        <UpdatePasswordForm id={id} />
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Text as='h4' styleVariant='secondary-heading'>
              Log in
            </Text>
            <Text as='p' styleVariant='body-normal' className='text-grey-200 font-medium'>
              How you log in into dReader
            </Text>
          </div>

          <div className='flex items-start border border-grey-300 p-5 rounded-xl gap-7 max-w-[607px]'>
            <div className='border border-grey-300 p-4 rounded-lg'>
              <LockIcon className='text-white' />
            </div>

            <div className='flex flex-col gap-1'>
              <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-[18px] leading-[25.2px]'>
                Password
              </Text>

              <Text as='p' styleVariant='body-normal' className='text-grey-200 font-medium'>
                To add a password to your account for the first time, you will need to use the&nbsp;
                <Text
                  as='span'
                  styleVariant='body-normal'
                  className='text-important-color underline underline-offset-4 cursor-pointer font-medium'
                  onClick={togglePasswordDialog}
                >
                  password reset page
                </Text>
                &nbsp;so we can verify your identity.
              </Text>
            </div>
          </div>
          <ResetPasswordDialog open={passwordDialogOpen} toggleDialog={togglePasswordDialog} />
        </div>
      )}
    </React.Fragment>
  )
}
