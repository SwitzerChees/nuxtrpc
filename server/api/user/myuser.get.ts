const outputFormat = z.object({
  id: z.string(),
  username: z.string(),
  roles: z.array(z.string()),
})

export type APIUserMyUserOutput = zinfer<typeof outputFormat>

export default defineEventHandler((event: H3Event) => {
  const { user } = event.context
  if (!user) return null

  return validate.output(user, outputFormat)
})
