import type { ToastMessageOptions } from 'primevue/toast'
import type { WatchSource } from 'vue'
import type { FetchError } from 'ofetch'
import { parse, serialize } from 'superjson'
import type { BaseAPIRoute } from '~/types'

type APIOpts = {
  successToast?: ToastMessageOptions
  errorToast?: boolean
  watch?: (WatchSource<unknown> | object)[]
  watchDebounce?: number
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
          if (!error) return
          if (opts.errorToast) nuxtApp.hooks.callHook('api:error' as any, error)
        },
        onResponseError: ({ error, response }) => {
          const responseError = error || response._data
          if (opts.onError) opts.onError(responseError)
          if (!responseError) return
          if (opts.errorToast) nuxtApp.hooks.callHook('api:error' as any, responseError)
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

  if (opts.watch) {
    const debounceTime = opts.watchDebounce || 0
    const debouncedRefresh = useDebounce(asyncData.refresh, debounceTime)
    watch(opts.watch, debouncedRefresh)
  }

  const isLoading = computed(() => asyncData.status.value === 'pending')

  const formatedError = computed(() => {
    if (!asyncData.error.value?.data) return
    return asyncData.error.value?.data ? useFormatedError(asyncData.error.value.data as Error) : undefined
  })

  return {
    data: asyncData.data,
    error: asyncData.error,
    formatedError,
    isLoading,
    execute: asyncData.execute,
  }
}
