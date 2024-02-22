import { z } from 'zod'
import { publicProcedure } from '~/server/trpc/trpc'
import { Context } from '~/server/trpc/context'

const inputFormat = z.object({
  withPosts: z.boolean().optional(),
})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx, input }: { input: Input; ctx: Context }) {
  return await ctx.db.query.users.findMany({
    with: {
      posts: input.withPosts || undefined,
    },
  })
}

export const users = publicProcedure.input(inputFormat).query(handler)
