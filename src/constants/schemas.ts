import { generateMaxLengthErrorMessage, generateMinLengthErrorMessage } from '@/utils/error'
import { z } from 'zod'

const loginSchema = z.object({
  nameOrEmail: z.string(),
  password: z.string(),
})

const registerSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
  email: z.string().email(),
  password: z.string(),
})

const registerWithGoogleSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
})

const forgotPasswordSchema = z.object({
  nameOrEmail: z.string().email('Must be an email address'),
})

const resetPasswordSchema = z.object({
  newPassword: z.string(),
  verificationToken: z.string(),
})

const updateUserAvatarValidationSchema = z.object({
  avatar: z.any(),
})

const updateUserValidationSchema = z.object({
  email: z.string().email().optional(),
  displayName: z
    .string()
    .min(2, generateMinLengthErrorMessage('name', 2))
    .max(40, generateMaxLengthErrorMessage('name', 40))
    .optional(),
  username: z
    .string()
    .min(2, generateMinLengthErrorMessage('username', 2))
    .max(20, generateMaxLengthErrorMessage('username', 20))
    .optional(),
})

const updateUserPasswordValidationSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

export {
  loginSchema,
  registerSchema,
  registerWithGoogleSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserAvatarValidationSchema,
  updateUserValidationSchema,
  updateUserPasswordValidationSchema,
}
