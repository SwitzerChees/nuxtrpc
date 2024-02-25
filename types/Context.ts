import type { inferAsyncReturnType } from '@trpc/server'
import type { createContext } from '~/server/trpc/context'

export type Context = inferAsyncReturnType<typeof createContext>

export type HandlerContext<T> = {
  ctx: Context
  input: T
}
