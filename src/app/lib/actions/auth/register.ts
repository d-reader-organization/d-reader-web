'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { fetchWrapper } from '../../fetchWrapper'
import { googleAccessTokenKey } from '@/constants/general'
import { AuthFormState, Authorization } from '@/models/auth/'
import { registerSchema, registerWithGoogleSchema } from '@/constants/schemas'
import { parseAndSetCookieAfterAuth } from './login'
import { mapZodParsedErrors } from '@/lib/forms'

const { AUTH, USER, REGISTER, REGISTER_WITH_GOOGLE } = AUTH_QUERY_KEYS

const registerAction = async (
  ref: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = registerSchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    const parsedErrors = mapZodParsedErrors(parsed.error?.errors)
    return { error: `Please provide valid data`, errors: parsedErrors, success: false }
  }

  try {
    const response = await fetchWrapper<Authorization>({
      body: { ...parsed.data, ...(!!ref && { ref }) },
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

    await parseAndSetCookieAfterAuth(response.data)
    revalidatePath(RoutePath.Register)
  } catch (_) {
    return { error: `Failed to register user`, success: false }
  }
  return { success: true }
}

const registerWithGoogleAction = async (
  ref: string | null,
  _: AuthFormState | null,
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
      body: { ...parsed.data, ...(!!ref && { ref }) },
      headers: {
        authorization: `Google ${(await cookies()).get(googleAccessTokenKey)?.value}`,
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
    await parseAndSetCookieAfterAuth(response.data)
    ;(await cookies()).delete(googleAccessTokenKey)
    revalidatePath(RoutePath.Register)
  } catch (_) {
    return { error: `Failed to register user`, success: false }
  }
  return { success: true }
}

export { registerAction, registerWithGoogleAction }
