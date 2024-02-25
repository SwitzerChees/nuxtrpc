import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import type { Context } from '~/types'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts
    let message = shape.message
    const data = shape.data as typeof shape.data & { issues?: ZodError['issues'] }
    const isZodError = (error as any)?.cause?.name === 'ZodError'
    if (isZodError) {
      const zodError = error.cause as unknown as ZodError
      message = 'error.zod'
      data.issues = zodError.issues
    } else if (!shape.message.startsWith('error.')) {
      message = 'error.unknown'
    }
    if (process.env.NODE_ENV === 'production') {
      delete data.stack
      delete data.path
    }
    return {
      code: shape.code,
      message,
      data,
    }
  },
})

export const publicProcedure = t.procedure
export const router = t.router
export const middleware = t.middleware
