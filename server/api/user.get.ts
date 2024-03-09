const inputFormat = z.object({
  posts: z.boolean().optional(),
})

const outputFormat = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
  }),
)

export type APIUserGetInput = zinfer<typeof inputFormat>
export type APIUserGetOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = validateQuery(event, inputFormat)
  const { db, isAdmin } = getContext(event)
  await checkAuthorized(isAdmin)
  const users = await db.query.userTable.findMany({
    with: {
      posts: input.posts || undefined,
    },
  })
  const output = validateOutput(users, outputFormat)
  return output
})
