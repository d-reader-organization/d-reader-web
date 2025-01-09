'use server'

import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { RoutePath } from '@/enums/routePath'
import { AuthFormState, Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { fetchWrapper } from '../../fetchWrapper'
import { accessTokenKey, jwtCookieProps, refreshTokenKey } from '@/constants/general'
import { loginSchema } from '@/constants/schemas'
import { mapZodParsedErrors } from '@/lib/forms'

const { AUTH, USER, LOGIN } = AUTH_QUERY_KEYS

export const loginAction = async (
  redirectTo: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = loginSchema.safeParse({
    nameOrEmail: formData.get('nameOrEmail') ?? '',
    password: formData.get('password') ?? '',
  })
  if (!parsed.success) {
    const parsedErrors = mapZodParsedErrors(parsed.error?.errors)
    return {
      error: `Please provide valid data`,
      errors: parsedErrors,
      success: false,
    }
  }

  try {
    const response = await fetchWrapper<Authorization>({
      body: parsed.data,
      method: 'PATCH',
      path: `${AUTH}/${USER}/${LOGIN}`,
    })

    if (response.errorMessage) {
      return {
        error: response.errorMessage,
        success: false,
      }
    }

    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }

    await parseAndSetCookieAfterAuth(response.data)
    revalidatePath(RoutePath.Login)
  } catch (error) {
    return {
      error: `Failed to login user`,
      success: false,
    }
  }

  redirect(redirectTo ?? RoutePath.Home, RedirectType.replace)
}

export const parseAndSetCookieAfterAuth = async (data: Authorization): Promise<void> => {
  const { accessToken, refreshToken } = data
  await Promise.all([
    setCookie({
      name: accessTokenKey,
      value: accessToken,
    }),
    setCookie({
      name: refreshTokenKey,
      value: refreshToken,
    }),
  ])
}

export const setCookie = async ({ name, value }: { name: string; value: string }) => {
  const cookieStore = await cookies()
  cookieStore.set(name, value, jwtCookieProps)
}
