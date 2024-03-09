const outputFormat = z.object({
  success: z.boolean(),
})

export type APIAuthLogoutOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { removeUserSession } = useUserSession()
  await removeUserSession(event)
  return useValidatedOutput({ success: true }, outputFormat)
})
