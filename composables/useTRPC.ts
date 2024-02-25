import type { ZodError } from 'zod'
import type { FormatedErrorType } from '~/types'

export const useTRPC = () => {
  const { $client } = useNuxtApp()

  const isLoading = ({ status }: { status: Ref<string> }) => {
    return computed(() => status.value === 'pending')
  }

  const onSuccess = ({ status }: { status: Ref<string> }, successFunction: () => void) => {
    if (!successFunction) return
    watch(status, (newStatus) => {
      if (newStatus === 'success') {
        successFunction()
      }
    })
  }

  const onError = ({ status }: { status: Ref<string> }, errorFunction: () => void) => {
    if (!errorFunction) return
    watch(status, (newStatus) => {
      if (newStatus === 'error') {
        errorFunction()
      }
    })
  }

  const formatedErrors = ({ error }: { error?: Ref<{ message: string } | null> }) => {
    return computed(() => {
      const err = error?.value as unknown as { message: string; data?: { httpStatus: number; issues: ZodError['issues'] } }
      if (!err) return null
      const formatedError: FormatedErrorType = { httpStatus: err.data?.httpStatus, message: err.message }
      if (err.message !== 'error.zod') return formatedError
      formatedError.issues = err.data?.issues
      return formatedError
    })
  }

  return { trpc: $client, isLoading, onSuccess, onError, formatedErrors }
}
