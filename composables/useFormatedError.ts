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
      for (const issue of zodError.issues) {
        detail += `${issue.path.join('.')} ${issue.code}\n`
      }
    }
    return { message: error.message, detail }
  }
  if (error.message.startsWith('Failed to fetch')) {
    return { message: 'error.network' }
  }
  return { message: 'error.unknown' }
}

export default useFormatedError
