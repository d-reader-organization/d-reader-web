'use server'

import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { RequestPasswordResetParams } from '@/models/user/requestPasswordResetParams'
import { RequestEmailChangeParams } from '@/models/user/requestEmailChangeParams'
import { ResetPasswordData } from '@/models/auth/resetPassword'
import { ConsentType, UpdateUserData, User } from '@/models/user'
import { Nullable } from '@/models/common'
import { UpdatePasswordData } from '@/models/auth/updatePassword'
import { getAccessToken } from '../../utils/auth'

const {
  AVATAR,
  CREATE,
  USER,
  UPDATE,
  RESET_PASSWORD,
  REQUEST_PASSWORD_RESET,
  REQUEST_EMAIL_CHANGE,
  UPDATE_PASSWORD,
  VERIFY_EMAIL,
  REQUEST_EMAIL_VERIFICATION,
  REMOVE,
  PRIVACY_CONSENT,
} = USER_QUERY_KEYS

export const requestUserPasswordReset = async (body: RequestPasswordResetParams): Promise<string> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<void>({
    accessToken,
    method: 'PATCH',
    body,
    isTextResponse: true,
    path: `${USER}/${REQUEST_PASSWORD_RESET}`,
  })
  return response.errorMessage ?? ''
}

export const requestUserEmailChange = async (data: RequestEmailChangeParams): Promise<void> => {
  await fetchWrapper<void>({
    method: 'PATCH',
    path: `${USER}/${REQUEST_EMAIL_CHANGE}`,
    body: data,
    isTextResponse: true,
  })
}

export const resetUserPassword = async (resetPasswordData: ResetPasswordData): Promise<void> => {
  const accessToken = await getAccessToken()
  await fetchWrapper({
    accessToken,
    path: `${USER}/${RESET_PASSWORD}`,
    isTextResponse: true,
    body: resetPasswordData,
    method: 'PATCH',
  })
}

export const updateUser = async (id: string | number, request: UpdateUserData): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<User>({
    accessToken,
    path: `${USER}/${UPDATE}/${id}`,
    body: request,
    method: 'PATCH',
  })
  return response
}

export const updateUserAvatar = async ({
  id,
  request,
}: {
  id: string | number
  request: FormData
}): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<User>({
    accessToken,
    path: `${USER}/${UPDATE}/${id}/${AVATAR}`,
    formData: request,
    method: 'PATCH',
  })

  return response
}

export const removeUserProfilePhoto = async (id: string | number): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<User>({
    accessToken,
    path: `${USER}/${REMOVE}/${id}/${AVATAR}`,
    method: 'PATCH',
  })

  return response
}

export const updateUserPassword = async ({
  id,
  request,
}: {
  id: string | number
  request: UpdatePasswordData
}): Promise<{ errorMessage?: string }> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<void>({
    accessToken,
    method: 'PATCH',
    path: `${USER}/${UPDATE_PASSWORD}/${id}`,
    body: request,
  })
  return response
}

export const verifyUserEmail = async (verificationToken: string): Promise<Nullable<User>> => {
  const accessToken = await getAccessToken()
  const response = await fetchWrapper<User>({
    accessToken,
    method: 'PATCH',
    path: `${USER}/${VERIFY_EMAIL}/${verificationToken}`,
  })
  return response.data
}

export const requestUserEmailVerification = async (): Promise<string> => {
  const accessToken = await getAccessToken()
  const { errorMessage } = await fetchWrapper<void>({
    accessToken,
    path: `${USER}/${REQUEST_EMAIL_VERIFICATION}`,
    method: 'PATCH',
  })
  return errorMessage ?? ' '
}

export const createUserConsent = async (payload: {
  isConsentGiven: boolean
  consentType: ConsentType
}): Promise<string> => {
  const response = await fetchWrapper({
    accessToken: await getAccessToken(),
    method: 'POST',
    path: `${USER}/${PRIVACY_CONSENT}/${CREATE}`,
    body: payload,
  })
  return response.errorMessage ?? ''
}
