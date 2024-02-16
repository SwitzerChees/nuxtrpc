import { z } from 'zod'
import { publicProcedure } from '~/server/trpc/trpc'
import { Context } from '~/server/trpc/context'

const inputFormat = z.object({
  text: z.string().nullish(),
})

type Input = z.infer<typeof inputFormat>

function handler({ input }: { input: Input; ctx: Context }) {
  return {
    greeting: `Greeting ${input?.text ?? 'World'}`,
  }
}

export const greeting = publicProcedure.input(inputFormat).query(handler)
