import { ParsedFormError } from '@/models/common'
import { ZodIssue } from 'zod'

export const mapZodParsedErrors = (errors?: ZodIssue[]): ParsedFormError[] | undefined => {
  const parsedErrors = errors?.map((error) => {
    return { message: error.message, paths: error.path }
  })

  return parsedErrors
}

export const findError = (errors: ParsedFormError[] = [], path: string) => {
  const error = errors.find((error) => error.paths.includes(path))
  return error?.message
}
