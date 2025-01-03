import { generateMaxLengthErrorMessage, generateMinLengthErrorMessage } from '@/utils/error'
import { z } from 'zod'

export const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9-_čćžšđČĆŽŠĐ]+$/)
// export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
export const PASSWORD_LOWERCASE_REGEX = new RegExp(/^(?=.*[a-z]).+$/)
export const PASSWORD_UPPERCASE_REGEX = new RegExp(/^(?=.*[A-Z]).+$/)
export const PASSWORD_DIGIT_REGEX = new RegExp(/^(?=.*\d).+$/)

const zUsername = z
  .string()
  .min(3, generateMinLengthErrorMessage('Username', 3))
  .max(20, generateMaxLengthErrorMessage('Username', 20))
  .regex(USERNAME_REGEX, 'Only A-Z, 0-9, underscore, and hypen are allowed')
const zDisplayName = z
  .string()
  .min(2, generateMinLengthErrorMessage('Display name', 2))
  .max(40, generateMaxLengthErrorMessage('Display name', 40))
const zEmail = z.string().email()
const zPassword = z
  .string()
  .min(8, generateMinLengthErrorMessage('Password', 8))
  .regex(PASSWORD_LOWERCASE_REGEX, 'Password should include a lowercase character')
  .regex(PASSWORD_UPPERCASE_REGEX, 'Password should include an uppercase character')
  .regex(PASSWORD_DIGIT_REGEX, 'Password should include a number')

const loginSchema = z.object({
  nameOrEmail: z.string(),
  password: z.string(),
})

const registerSchema = z.object({
  name: zUsername,
  email: zEmail,
  password: zPassword,
})

const registerWithGoogleSchema = z.object({
  name: zUsername,
})

const forgotPasswordSchema = z.object({
  nameOrEmail: zEmail, // limit only to email
})

const resetPasswordSchema = z.object({
  newPassword: zPassword,
  verificationToken: z.string(),
})

const updateUserAvatarValidationSchema = z.object({
  avatar: z.any(),
})

const updateUserValidationSchema = z.object({
  email: zEmail.optional(),
  username: zUsername.optional(),
  displayName: zDisplayName.optional(),
})

const updateUserPasswordValidationSchema = z.object({
  oldPassword: z.string(), // we don't care about validating the format of an old password
  newPassword: zPassword,
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
