import { H3Event } from 'h3'
import { z } from 'zod'

const inputFormat = z.object({
  posts: z.boolean().optional(),
})

const outputFormat = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
  }),
)

export type APIUserGetInput = z.infer<typeof inputFormat>
export type APIUserGetOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = useValidatedQuery(event, inputFormat)
  const { db } = event.context
  const users = await db.query.userTable.findMany({
    with: {
      posts: input.posts || undefined,
    },
  })
  const output = useValidatedOutput(users, outputFormat)
  return output
})
