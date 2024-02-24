import { router } from '../trpc'
import * as user from '~/server/procedures/user'
import * as auth from '~/server/procedures/auth'

export const appRouter = router({
  user: router(user),
  auth: router(auth),
})

// export type definition of API
export type AppRouter = typeof appRouter
