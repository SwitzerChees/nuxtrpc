import { H3Event } from 'h3'
import { z } from 'zod'

const outputFormat = z.object({
  id: z.string(),
  username: z.string(),
  roles: z.array(z.string()),
})

export type APIUserMyOuserOutput = z.infer<typeof outputFormat>

export default defineEventHandler((event: H3Event) => {
  const { user } = event.context
  if (!user) return null

  return useValidatedOutput(user, outputFormat)
})
