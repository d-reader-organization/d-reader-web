'use client'

import React from 'react'
import { UpdateUserAvatarForm } from '../form/UpdateUserAvatarForm'
import { UpdatePasswordForm } from '../form/UpdatePasswordForm'
import { UpdateUserDetailsForm } from '../form/UpdateUserDetailsForm'
import { User } from '@/models/user'
import { Text } from '../ui'
import { Divider } from '../shared/Divider'

type Props = {
  user: User
}

export const AccountSettingSection: React.FC<Props> = ({ user }) => {
  const { id, name, email, avatar } = user

  return (
    <div className='flex flex-col px-2 gap-4'>
      <Text as='h5' styleVariant='secondary-heading'>
        Your Account
      </Text>
      <UpdateUserDetailsForm id={id} name={name} email={email} />
      <Divider />
      <UpdateUserAvatarForm id={id} avatar={avatar} />
    </div>
  )
}
