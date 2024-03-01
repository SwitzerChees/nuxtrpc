import type { ToastMessageOptions } from 'primevue/toast'
import type { FetchError } from 'ofetch'
import { parse, serialize } from 'superjson'
import type { BaseAPIRoute } from '~/types'

type APIOpts = {
  successToast?: ToastMessageOptions
  errorToast?: boolean
  watchInput?: boolean | { debounce?: number }
  immediate?: boolean
  headers?: Record<string, string>
}

type WithConditionalInput<TRoute extends BaseAPIRoute<unknown, unknown>> = unknown extends TRoute['Input'] ? {} : { input: TRoute['Input'] }

export const useAPI = <TRoute extends BaseAPIRoute<unknown, unknown>>(
  apiRoute: TRoute,
  opts: WithConditionalInput<TRoute> & {
    onSuccess?: (data?: TRoute['Output'] | null) => void
    onError?: (error?: FetchError) => void
  } & APIOpts,
) => {
  const nuxtApp = useNuxtApp()
  const asyncData = useAsyncData<TRoute['Output']>(
    () => {
      let apiRoutePath = apiRoute.Path
      const params = ('input' in opts ? opts.input : undefined) as any
      if (params && apiRoutePath.includes('[') && apiRoutePath.includes(']')) {
        Object.keys(params).forEach((key) => {
          apiRoutePath = apiRoutePath.replace(`[${key}]`, params[key])
        })
      }
      return $fetch<TRoute['Output']>(apiRoutePath, {
        method: apiRoute.Method,
        onRequest: ({ options }) => {
          options.headers = new Headers(opts.headers || options.headers || {})
          const canHaveBody = apiRoute.Method === 'POST' || apiRoute.Method === 'DELETE' || apiRoute.Method === 'PUT'
          const body = canHaveBody && 'input' in opts ? opts.input : undefined
          if (body) {
            options.body = serialize(body)
          }
          const queryParams = apiRoute.Method === 'GET' && 'input' in opts ? opts.input : undefined
          if (queryParams) {
            options.params = serialize(queryParams)
          }
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
          response._data = parse(JSON.stringify(response._data))
          if (opts.successToast) nuxtApp.hooks.callHook('api:success' as any, opts.successToast)
          if (opts.onSuccess) opts.onSuccess(response._data)
        },
      })
    },
    {
      immediate: opts.immediate ?? true,
    },
  )

  if ('input' in opts && opts.watchInput && opts.input) {
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
