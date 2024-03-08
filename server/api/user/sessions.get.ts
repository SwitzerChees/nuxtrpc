import { H3Event } from 'h3'
import { z } from 'zod'

const inputFormat = z.object({
  userId: z.string(),
})

const outputFormat = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
  }),
)

export type APISessionsByUserIdInput = z.infer<typeof inputFormat>
export type APISessionsByUserIdOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = useValidatedQuery(event, inputFormat)
  const { db } = event.context
  const { isAdmin } = useUserSession()
  const isMyUser = input.userId === event.context?.user?.id
  if (!isAdmin(event) || !isMyUser) {
    throw createError({
      statusCode: 403,
      message: 'error.unauthorized',
    })
  }
  const sessions = await db.query.sessionTable.findMany({
    where: (sessions, { eq }) => eq(sessions.userId, input.userId),
  })
  const output = useValidatedOutput(sessions, outputFormat)
  return output
})
