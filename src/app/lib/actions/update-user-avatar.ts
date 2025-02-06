'use server'

import { AuthFormState } from '@/models/auth'
import { updateUserAvatarValidationSchema } from '@/constants/schemas'
import { updateUserAvatar } from '../api/user/mutations'

export const updateUserAvatarAction = async (
  id: string | number,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = updateUserAvatarValidationSchema.safeParse({
    avatar: formData.get('avatar') ?? '',
  })

  if (!parsed.success) {
    return {
      error: `You have to upload new avatar`,
      success: false,
    }
  }
  try {
    await updateUserAvatar({ id, request: formData })
    return { success: true }
  } catch (_) {
    return {
      error: `Failed to upload new avatar`,
      success: false,
    }
  }
}
