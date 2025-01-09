'use server'

import { AuthFormState } from '@/models/auth'
import { requestPasswordResetSchema } from '@/constants/schemas'
import { requestUserPasswordReset } from '../../api/user/mutations'

export const requestPasswordResetAction = async (
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = requestPasswordResetSchema.safeParse({
    nameOrEmail: formData.get('nameOrEmail') ?? '',
  })
  if (!parsed.success) {
    return {
      error: `Name or email is required`,
      success: false,
    }
  }
  try {
    const errorMessage = await requestUserPasswordReset({ nameOrEmail: parsed.data.nameOrEmail })
    return { success: !errorMessage, error: errorMessage }
  } catch (_) {
    return {
      error: `Failed to send reset password email`,
      success: false,
    }
  }
}
