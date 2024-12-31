'use client'

import Intercom from '@intercom/messenger-js-sdk'
import { User } from '@/models/user'
import { Nullable } from '@/models/common'

type Props = { user: Nullable<User> }

export const IntercomClient: React.FC<Props> = ({ user }) => {
  Intercom({
    app_id: 'kqybu780',
    user_id: user?.id.toString(),
    name: user?.username,
    email: user?.email,
  })

  return null
}
