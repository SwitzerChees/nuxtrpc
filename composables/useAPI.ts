import type { APIRoute } from '~/types'

export const useAPI = async <TRoute extends APIRoute>(apiRoute: APIRoute, opts: { input?: TRoute['Input'] } = {}) => {
  const fetch = await useFetch<typeof apiRoute.Output>(apiRoute.Path, {
    method: apiRoute.Method,
    body: opts.input,
  })
  return { data: fetch.data, pending: fetch.pending, refresh: fetch.refresh, error: fetch.error }
}
