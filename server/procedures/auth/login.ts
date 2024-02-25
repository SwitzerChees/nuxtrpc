import { z } from 'zod'
import { setCookie } from 'h3'
import { Argon2id } from 'oslo/password'
import { TRPCError } from '@trpc/server'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'

const inputFormat = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(64),
})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx, input }: HandlerContext<Input>) {
  const { db, event } = ctx
  const { lucia } = useLucia()
  const { username, password } = input

  const user = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })
  if (!user) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'error.login.user.notExists',
    })
  }
  const isPasswordValid = await new Argon2id().verify(user.password, password)
  if (!isPasswordValid) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'error.login.password.invalid',
    })
  }
  const session = await lucia.createSession(user.id, {})
  if (!session) {
    throw new Error('error.session.failed')
  }
  const sessionCookie = await lucia.createSessionCookie(session.id)
  if (!sessionCookie) {
    throw new Error('error.session.cookie.failed')
  }
  setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return true
}

export const login = publicProcedure.input(inputFormat).mutation(handler)
