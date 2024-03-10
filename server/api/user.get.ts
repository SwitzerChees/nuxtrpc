import { asc, count, desc, ilike } from 'drizzle-orm'
import { userTable } from '../database/schema'

const inputFormat = z.object({
  filter: z.string().optional(),
  limit: z.number().min(1).max(100).default(10).optional(),
  offset: z.number().min(0).default(0).optional(),
  orderBy: z.enum(['username']).optional(),
  orderByASC: z.boolean().default(true).optional(),
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

  const usernameFilter = input.filter ? ilike(userTable.username, `%${input.filter}%`) : undefined
  const orderBy = input.orderByASC ? asc(userTable[input.orderBy || 'username']) : desc(userTable[input.orderBy || 'username'])
  const totalUsersResult = await db
    .select({ value: count(userTable.id) })
    .from(userTable)
    .where(usernameFilter)
  const totalUsers = totalUsersResult[0].value || 0

  const users = await db.query.userTable.findMany({
    limit: input.limit,
    offset: input.offset,
    where: usernameFilter,
    orderBy,
    with: {
      posts: input.posts || undefined,
    },
  })
  return validateOutput({ total: totalUsers, users }, outputFormat)
})
