import { z } from 'zod'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'

const inputFormat = z.object({
  withPosts: z.boolean().optional(),
})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx, input }: HandlerContext<Input>) {
  return await ctx.db.query.userTable.findMany({
    with: {
      posts: input.withPosts || undefined,
    },
  })
}

export const users = publicProcedure.input(inputFormat).query(handler)
