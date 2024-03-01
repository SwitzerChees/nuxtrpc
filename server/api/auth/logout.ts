import { H3Event } from 'h3'
import { z } from 'zod'

const outputFormat = z.object({
  success: z.boolean(),
})

export type APIAuthLogoutOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { session } = event.context
  const { lucia } = useLucia()
  if (!session?.id) return true
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return useValidatedOutput({ success: true }, outputFormat)
})
