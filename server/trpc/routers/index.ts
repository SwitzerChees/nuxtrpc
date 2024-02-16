import { router } from '../trpc'
import * as hello from '~/server/handlers/hello'

export const appRouter = router({
  hello: router(hello),
})

// export type definition of API
export type AppRouter = typeof appRouter
