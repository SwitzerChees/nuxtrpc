import { z } from 'zod'
import { publicProcedure } from '../trpc/trpc'
import { Context } from '../trpc/context'

const queryFormat = z.object({
  text: z.string().nullish(),
})

function handler({ input, ctx }: { input: z.infer<typeof queryFormat>; ctx: Context }) {
  return {
    greeting: `hello ${input?.text ?? 'world'}`,
    greeting2: ctx.user,
  }
}

export const hello = publicProcedure.input(queryFormat).query(handler)
