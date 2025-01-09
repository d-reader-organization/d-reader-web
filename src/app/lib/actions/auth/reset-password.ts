'use server'

import { AuthFormState } from '@/models/auth'
import { resetPasswordSchema } from '@/constants/schemas'
import { resetUserPassword } from '../../api/user/mutations'

export const resetPasswordAction = async (
  verificationToken: string,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = resetPasswordSchema.safeParse({
    newPassword: formData.get('newPassword') ?? '',
    verificationToken,
  })
  if (!parsed.success) {
    return {
      error: `Missing new password and/or verification token`,
      success: false,
    }
  }
  try {
    await resetUserPassword(parsed.data)

    return { success: true }
  } catch (_) {
    return {
      error: `Failed to reset user password`,
      success: false,
    }
  }
}
