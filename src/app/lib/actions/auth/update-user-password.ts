'use server'

import { AuthFormState } from '@/models/auth'
import { updateUserPasswordValidationSchema } from '@/constants/schemas'
import { updateUserPassword } from '../../api/user/mutations'
import { mapZodParsedErrors } from '@/lib/forms'

export const updateUserPasswordAction = async (
  id: string | number,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = updateUserPasswordValidationSchema.safeParse({
    oldPassword: formData.get('oldPassword') ?? '',
    newPassword: formData.get('newPassword') ?? '',
  })
  if (!parsed.success) {
    const parsedErrors = mapZodParsedErrors(parsed.error?.errors)
    return { errors: parsedErrors, success: false }
  }
  try {
    const response = await updateUserPassword({ id, request: parsed.data })

    if (response.errorMessage) {
      return {
        error: response.errorMessage,
        success: false,
      }
    }

    return { success: true }
  } catch (_) {
    return {
      error: `Failed to reset user password`,
      success: false,
    }
  }
}
