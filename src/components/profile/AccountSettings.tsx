import React from 'react'
import { UpdateUserAvatarForm } from '../form/UpdateUserAvatarForm'
import { UpdateUserDetailsForm } from '../form/UpdateUserDetailsForm'
import { Text } from '../ui'
import { Divider } from '../shared/Divider'
import { fetchMe } from '@/app/lib/api/user/queries'

export const AccountSettings: React.FC = async () => {
  const me = await fetchMe()
  if (!me) return null
  const { id, displayName, username, email, avatar } = me

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

export default AccountSettings
