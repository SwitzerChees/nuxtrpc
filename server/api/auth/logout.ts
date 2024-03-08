import { H3Event } from 'h3'
import { z } from 'zod'

const outputFormat = z.object({
  success: z.boolean(),
})

export type APIAuthLogoutOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { removeUserSession } = useUserSession()
  await removeUserSession(event)
  return useValidatedOutput({ success: true }, outputFormat)
})
