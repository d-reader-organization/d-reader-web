export const generateRequiredArrayElementErrorMessage = (name: string) => `All of ${name} inputs are required`

export const generateMinNumberErrorMessage = (name: string, min: number) => `Minimum value for ${name} is ${min}`

export const generateMaxNumberErrorMessage = (name: string, max: number) => `Maximum value for ${name} is ${max}`

export const generateMinLengthErrorMessage = (name: string, minLength: string | number) =>
  `${name} should have atleast ${minLength} characters`

export const generateMaxLengthErrorMessage = (name: string, maxLength: string | number) =>
  `${name} can have max ${maxLength} characters`

export const generateNotCheckedErrorMessage = (name: string) => `${name} must be checked`

export const generateEmptyStringErorrMessage = (name: string) => `${name} can't be empty`

interface AxiosError {
  isAxiosError: boolean
  message: string
  response?: {
    data: {
      message: string
    }
  }
}

export function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && (error as AxiosError).isAxiosError === true
}
