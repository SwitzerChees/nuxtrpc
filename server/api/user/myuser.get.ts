import { H3Event } from 'h3'
import { z } from 'zod'

const outputFormat = z.object({
  id: z.string(),
  username: z.string(),
})

export type APIUserMyOuserOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, user } = event.context
  if (!user) return null
  const myUser = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.id, user?.id),
  })
  if (!myUser) return null

  return useValidatedOutput(myUser, outputFormat)
})
