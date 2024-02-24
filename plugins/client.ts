import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import { observable } from '@trpc/server/observable'
import type { TRPCLink } from '@trpc/client'
import type { NuxtApp } from '#app'
import superjson from 'superjson'
import type { AppRouter } from '~/server/trpc/routers'

const loggerLink = (nuxtApp: NuxtApp) => {
  const loggerLink: TRPCLink<AppRouter> = () => {
    return ({ next, op }) => {
      return observable((observer) => {
        const unsubscribe = next(op).subscribe({
          next(value) {
            observer.next(value)
          },
          error(err) {
            nuxtApp.hooks.callHook('trpc:error' as any, err)
            observer.error(err)
          },
          complete() {
            observer.complete()
          },
        })
        return unsubscribe
      })
    }
  }
  return loggerLink
}

export default defineNuxtPlugin((nuxtApp) => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      loggerLink(nuxtApp as NuxtApp),
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
    transformer: superjson,
  })

  return {
    provide: {
      client,
    },
  }
})
