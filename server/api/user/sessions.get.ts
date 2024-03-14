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

export type APISessionsByUserIdInput = zinfer<typeof inputFormat>
export type APISessionsByUserIdOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, isAdmin, validateInput, user } = getContext(event)
  const input = await validateInput(inputFormat)
  const isMyUser = input.userId === user?.id
  await checkAuthorized(() => isAdmin() || isMyUser)
  const sessions = await db.query.sessionTable.findMany({
    where: (sessions, { eq }) => eq(sessions.userId, input.userId),
  })
  const output = validate.output(sessions, outputFormat)
  return output
})
