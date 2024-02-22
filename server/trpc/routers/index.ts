import { router } from '../trpc'
import * as user from '~/server/procedures/user'

export const appRouter = router({
  user: router(user),
})

// export type definition of API
export type AppRouter = typeof appRouter
