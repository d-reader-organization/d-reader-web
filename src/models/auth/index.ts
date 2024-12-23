import { Role } from '@/enums/role'
import { Creator } from '@/models/creator'
import { User } from '@/models/user'

export interface Authorization {
  accessToken: string
  refreshToken: string
}

export type UserPayload = {
  type: 'user'
  id: User['id']
  email: User['email']
  username: User['username']
  role: User['role']
}

export type CreatorPayload = {
  type: 'creator'
  id: Creator['id']
  email: Creator['email']
  name: Creator['name']
}

export const emptyUserPayload: JwtPayload<UserPayload> = Object.freeze({
  type: 'user',
  id: 0,
  email: '',
  username: '',
  role: Role.User,
  iat: Date.now(),
  exp: Date.now(),
})

export const emptyCreatorPayload: JwtPayload<CreatorPayload> = Object.freeze({
  type: 'creator',
  id: 0,
  email: '',
  name: '',
  iat: Date.now(),
  exp: Date.now(),
})

export type JwtPayload<T> = T & {
  iat: number
  exp: number
}

export type AuthFormState = {
  error?: string
  success: boolean
}
