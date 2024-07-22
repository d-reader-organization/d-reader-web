'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { fetchWrapper } from '../fetchWrapper'
import { googleAccessTokenKey } from '@/constants/general'
import { AuthFormState, Authorization } from '@/models/auth/'
import { parseAndSetCookieAfterAuth } from './login'
import { registerSchema, registerWithGoogleSchema } from '@/constants/schemas'

const { AUTH, USER, REGISTER, REGISTER_WITH_GOOGLE } = AUTH_QUERY_KEYS

const registerAction = async (_: AuthFormState | null, formData: FormData): Promise<AuthFormState | null> => {
  const parsed = registerSchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    return { error: `Please provide valid data`, success: false }
  }

  try {
    const response = await fetchWrapper<Authorization>({
      body: parsed.data,
      method: 'POST',
      path: `${AUTH}/${USER}/${REGISTER}`,
    })

    if (response.errorMessage) {
      return { error: response.errorMessage, success: false }
    }
    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }

    parseAndSetCookieAfterAuth(response.data)
    revalidatePath(RoutePath.Register)
  } catch (error) {
    return { error: `Failed to register user`, success: false }
  }
  return { success: true }
}

const registerWithGoogleAction = async (
  prev: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = registerWithGoogleSchema.safeParse({
    name: formData.get('name') ?? '',
  })

  if (!parsed.success) {
    return { error: `Please provide valid username`, success: false }
  }

  try {
    const response = await fetchWrapper<Authorization>({
      body: parsed.data,
      headers: {
        authorization: `Google ${cookies().get(googleAccessTokenKey)?.value}`,
      },
      method: 'POST',
      path: `${AUTH}/${USER}/${REGISTER_WITH_GOOGLE}`,
    })

    if (response.errorMessage) {
      return { error: response.errorMessage, success: false }
    }
    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }
    parseAndSetCookieAfterAuth(response.data)
    cookies().delete(googleAccessTokenKey)
    revalidatePath(RoutePath.Register)
  } catch (error) {
    return { error: `Failed to register user`, success: false }
  }
  return { success: true }
}

export { registerAction, registerWithGoogleAction }
