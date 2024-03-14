import * as zod from 'zod'

const useFormatedError = (error: Error) => {
  if (!error.message) return { message: 'error.unknown' }
  if (error.message.startsWith('error.')) {
    return { message: error.message }
  }
  if (error.message.startsWith('zod.')) {
    let detail = ''
    if ('data' in error) {
      const zodError = { issues: error.data } as unknown as zod.ZodError
      detail = zodError.issues.map((issue) => issue.message).join('\n')
    }
    return { message: error.message, detail }
  }
  if (error.message.startsWith('Failed to fetch')) {
    return { message: 'error.network' }
  }
  return { message: 'error.unknown' }
}

export default useFormatedError
