import React from 'react'
import { User } from '@/models/user'
import { UpdatePasswordForm } from '../form/UpdatePasswordForm'

type Props = {
  user: User
}

export const SecuritySection: React.FC<Props> = ({ user }) => {
  const { id } = user

  return (
    <div>
      <UpdatePasswordForm id={id} />
    </div>
  )
}
