import React from 'react'
import { UpdateUserAvatarForm } from '../form/UpdateUserAvatarForm'
import { UpdateUserDetailsForm } from '../form/UpdateUserDetailsForm'
import { User } from '@/models/user'
import { Text } from '../ui'
import { Divider } from '../shared/Divider'

type Props = {
  user: User
}

export const AccountSettingSection: React.FC<Props> = ({ user }) => {
  const { id, displayName, username, email, avatar } = user

  return (
    <div className='flex flex-col gap-4'>
      <Text as='h4' styleVariant='secondary-heading'>
        Your Account
      </Text>
      <UpdateUserDetailsForm id={id} displayName={displayName} email={email} username={username} />
      <Divider />
      <UpdateUserAvatarForm id={id} avatar={avatar} />
    </div>
  )
}
