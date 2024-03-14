const outputFormat = z.object({
  success: z.boolean(),
})

export type APIAuthLogoutOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  await usersession.remove(event)
  return validate.output({ success: true }, outputFormat)
})
