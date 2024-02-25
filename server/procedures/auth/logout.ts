import { z } from 'zod'
import { setCookie } from 'h3'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'

const inputFormat = z.object({})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx }: HandlerContext<Input>) {
  const { event, session } = ctx
  const { lucia } = useLucia()
  if (!session?.id) return true
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return true
}

export const logout = publicProcedure.input(inputFormat).mutation(handler)
