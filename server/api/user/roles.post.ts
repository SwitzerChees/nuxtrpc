import { and, eq } from 'drizzle-orm'
import { UserRoles } from '~/definitions'
import { userRoleTable } from '~/server/database/schema'

const inputFormat = z.object({
  userId: z.string().uuid(),
  roles: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
  ),
})

const outputFormat = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
)

export type APIUserRolesPostInput = zinfer<typeof inputFormat>
export type APIUserRolesPostOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { validateInput, isAdmin, checkAuthorized, db, user } = context.get(event)
  await checkAuthorized(isAdmin)
  const input = await validateInput(inputFormat)
  const existingUserRoles = await db.query.userRoleTable.findMany({
    where: (userRoles, { eq }) => eq(userRoles.userId, input.userId),
    with: {
      role: true,
    },
  })
  await db.transaction(async (db) => {
    for (const role of input.roles) {
      const existingUserRole = existingUserRoles.find((userRole) => userRole.roleId === role.id)
      if (existingUserRole) {
        continue
      }
      await db.insert(userRoleTable).values({ userId: input.userId, roleId: role.id }).returning()
    }
    for (const existingUserRole of existingUserRoles) {
      const role = input.roles.find((role) => role.id === existingUserRole.roleId)
      if (role) {
        continue
      }
      if (existingUserRole.userId === user?.id && isAdmin() && existingUserRole.role.name === UserRoles.Admin) {
        throw createError({
          statusCode: 400,
          message: 'error.user.roles.removeownadmin',
        })
      }
      await db.delete(userRoleTable).where(and(eq(userRoleTable.userId, input.userId), eq(userRoleTable.roleId, existingUserRole.roleId)))
    }
  })
  const output = validate.output(input.roles, outputFormat)
  return output
})
