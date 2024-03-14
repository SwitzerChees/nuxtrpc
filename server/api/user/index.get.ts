import { asc, count, desc, ilike } from 'drizzle-orm'
import { userTable } from '../../database/schema'

const inputFormat = z.object({
  filter: z.string().optional(),
  limit: z.number().min(1).max(100).default(10).optional(),
  offset: z.number().min(0).default(0).optional(),
  orderBy: z.enum(['username']).default('username').optional(),
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
  const { db, isAdmin, validateInput } = context.get(event)
  const input = await validateInput(inputFormat)
  await checkAuthorized(isAdmin)

  const whereUsername = input.filter ? ilike(userTable.username, `%${input.filter}%`) : undefined
  const orderByColumn = userTable[input.orderBy || 'username']
  const orderBy = input.orderByASC ? asc(orderByColumn) : desc(orderByColumn)
  const totalUsersResult = await db
    .select({ value: count(userTable.id) })
    .from(userTable)
    .where(whereUsername)
  const totalUsers = totalUsersResult[0].value || 0

  const users = await db.query.userTable.findMany({
    limit: input.limit,
    offset: input.offset,
    where: whereUsername,
    orderBy,
    with: {
      posts: input.posts || undefined,
    },
  })
  return validate.output({ total: totalUsers, users }, outputFormat)
})
