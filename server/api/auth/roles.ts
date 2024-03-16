const outputFormat = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
)

export type APIAuthRolesOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, isAdmin, checkAuthorized } = context.get(event)
  await checkAuthorized(() => isAdmin())
  const roles = await db.query.roleTable.findMany()
  return validate.output(roles, outputFormat)
})
