import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from '~/types'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape } = opts
    const filterMessage = !shape.message.startsWith('error.')
    return {
      code: shape.code,
      message: filterMessage ? 'error.unknown' : shape.message,
      data: process.env.NODE_ENV === 'production' ? {} : shape.data,
    }
  },
})

export const publicProcedure = t.procedure
export const router = t.router
export const middleware = t.middleware
