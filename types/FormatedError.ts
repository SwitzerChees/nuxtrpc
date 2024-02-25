import type { ZodError } from 'zod'

export type FormatedErrorType = {
  httpStatus?: number
  message: string
  issues?: ZodError['issues']
}
