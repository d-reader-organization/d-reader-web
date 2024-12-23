import { Role } from '@/enums/role'

export interface User {
  id: number
  username: string
  displayName: string
  email: string
  avatar: string
  isEmailVerified: boolean
  hasBetaAccess: boolean
  referralsRemaining: number
  role: Role
}

export interface UpdateUserData extends Partial<Pick<User, 'email' | 'username' | 'displayName'>> {
  referrer?: string
}

export type UpdateUserAvatarData = Partial<{ avatar: File }>

export type UpdateUserPassword = {
  oldPassword: string
  newPassword: string
}
