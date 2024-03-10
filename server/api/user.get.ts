import { count } from 'drizzle-orm'
import { userTable } from '../database/schema'

const inputFormat = z.object({
  filter: z.string().optional(),
  limit: z.number().min(1).max(100).default(10).optional(),
  offset: z.number().min(0).default(0).optional(),
  posts: z.boolean().optional(),
})

const outputFormat = z.object({
  total: z.number(),
  users: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
    }),
  ),
})

export type APIUserGetInput = zinfer<typeof inputFormat>
export type APIUserGetOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, isAdmin, validateInput } = getContext(event)
  const input = await validateInput(inputFormat)
  await checkAuthorized(isAdmin)
  const totalUsers = (await db.select({ value: count(userTable.id) }).from(userTable))[0].value || 0
  const users = await db.query.userTable.findMany({
    limit: input.limit,
    offset: input.offset,
    where: (users, { ilike }) => {
      if (input.filter) {
        return ilike(users.username, `%${input.filter}%`)
      }
    },
    with: {
      posts: input.posts || undefined,
    },
  })
  return validateOutput({ total: totalUsers, users }, outputFormat)
})
