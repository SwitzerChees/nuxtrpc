import * as zod from 'zod'
import type { FormatedError } from '~/definitions'

const useFormatedError = (error: Error): FormatedError => {
  if (!error.message) return { message: 'error.unknown' }
  if (error.message.startsWith('error.')) {
    return { message: error.message }
  }
  if (error.message.startsWith('zod.')) {
    const issues: { code: string; minimum: number; path: string[] }[] = []
    if ('data' in error) {
      const zodError = { issues: error.data } as unknown as zod.ZodError
      issues.push(
        ...zodError.issues.map((issue) => ({
          code: issue.code,
          minimum: (issue as any).minimum,
          path: issue.path.map((path) => path.toString()),
        })),
      )
    }
    return { message: error.message, issues }
  }
  if (error.message.startsWith('Failed to fetch')) {
    return { message: 'error.network' }
  }
  return { message: 'error.unknown' }
}

export default useFormatedError
