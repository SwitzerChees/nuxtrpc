import type { ToastMessageOptions } from 'primevue/toast'
import type { FetchError } from 'ofetch'
import type { APIRoute } from '~/types'

type APIOpts = {
  successToast?: ToastMessageOptions
  errorToast?: boolean
  watchInput?: boolean | { debounce?: number }
  immediate?: boolean
}

export const useAPI = <TRoute extends APIRoute>(
  apiRoute: APIRoute,
  opts: {
    input?: TRoute['Input']
    onSuccess?: (data?: TRoute['Output'] | null) => void
    onError?: (error?: FetchError) => void
  } & APIOpts = {},
) => {
  const nuxtApp = useNuxtApp()
  const asyncData = useAsyncData<typeof apiRoute.Output>(
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
        onRequestError: ({ error }) => {
          if (opts.errorToast) nuxtApp.hooks.callHook('api:error' as any, error)
          if (opts.onError) opts.onError(error)
        },
        onResponseError: ({ error, response }) => {
          const responseError = error || response._data
          if (!responseError) return
          if (opts.errorToast) nuxtApp.hooks.callHook('api:error' as any, responseError)
          if (opts.onError) opts.onError(responseError)
        },
        onResponse: ({ response }) => {
          if (response.status < 200 || response.status > 299) return
          if (opts.successToast) nuxtApp.hooks.callHook('api:success' as any, opts.successToast)
          if (opts.onSuccess) opts.onSuccess(response._data)
        },
      })
    },
    {
      immediate: opts.immediate ?? true,
    },
  )

  if (opts.watchInput) {
    const debounceTime = typeof opts.watchInput === 'object' ? opts.watchInput.debounce : 0
    const debouncedExecute = useDebounce(asyncData.execute, debounceTime ?? 0)
    watch(opts.input as any, debouncedExecute)
  }

  return {
    data: asyncData.data,
    pending: asyncData.pending,
    error: asyncData.error,
    execute: asyncData.execute,
  }
}
