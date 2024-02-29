import type { ToastMessageOptions } from 'primevue/toast'
import type { FetchError } from 'ofetch'
import type { APIRoute } from '~/types'

type APIOpts = {
  successToast?: ToastMessageOptions
  errorToast?: boolean
  watchInput?: boolean | { debounce?: number }
  immediate?: boolean
}

export const useAPI = async <TRoute extends APIRoute>(apiRoute: APIRoute, opts: { input?: TRoute['Input'] } & APIOpts = {}) => {
  const asyncData = await useAsyncData<typeof apiRoute.Output>(
    () => {
      return $fetch<typeof apiRoute.Output>(apiRoute.Path, {
        method: apiRoute.Method,
        body: opts.input,
        onRequest: ({ options }) => {
          if (!(options.headers instanceof Headers)) {
            options.headers = new Headers(options.headers ?? {})
          }
          // options.headers.set('Content-Type', 'application/json')
        },
      })
    },
    {
      immediate: opts.immediate ?? true,
    },
  )

  const onSuccess = (successFunction: (data?: typeof apiRoute.Output | null) => void) => {
    if (!successFunction) return
    watch(asyncData.status, (newStatus) => {
      if (newStatus === 'success') {
        successFunction(asyncData.data.value)
      }
    })
  }

  const onError = (errorFunction: (error?: FetchError) => void) => {
    if (!errorFunction) return
    watch(asyncData.status, (newStatus) => {
      if (newStatus === 'error' && asyncData.error.value) {
        errorFunction(asyncData.error.value)
      }
    })
  }

  const debounceTime = typeof opts.watchInput === 'object' ? opts.watchInput.debounce : 0
  const debouncedExecute = useDebounce(asyncData.execute, debounceTime ?? 0)
  if (opts.watchInput) {
    watch(opts.input as any, debouncedExecute)
  }

  return {
    data: asyncData.data,
    pending: asyncData.pending,
    error: asyncData.error,
    execute: asyncData.execute,
    onSuccess,
    onError,
  }
}
