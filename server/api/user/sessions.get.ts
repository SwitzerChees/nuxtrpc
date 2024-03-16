const inputFormat = z.object({
  userId: z.string(),
})

const outputFormat = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
    platform: z.string().nullable(),
    browser: z.string().nullable(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
  }),
)

export type APISessionsByUserIdInput = zinfer<typeof inputFormat>
export type APISessionsByUserIdOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, isAdmin, validateInput, user, checkAuthorized } = context.get(event)
  const input = await validateInput(inputFormat)
  const isMyUser = input.userId === user?.id
  await checkAuthorized(() => isAdmin() || isMyUser)
  const sessions = await db.query.sessionTable.findMany({
    where: (sessions, { eq }) => eq(sessions.userId, input.userId),
  })
  return validate.output(sessions, outputFormat)
})
