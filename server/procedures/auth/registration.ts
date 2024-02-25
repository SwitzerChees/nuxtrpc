import { z } from 'zod'
import { setCookie } from 'h3'
import { Argon2id } from 'oslo/password'
import { TRPCError } from '@trpc/server'
import { useUUID } from '../../utils/uuid'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'
import { UserSelect, userTable } from '~/server/database/schema'

const inputFormat = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(64),
  passwordConfirmation: z.string(),
})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx, input }: HandlerContext<Input>) {
  const { db, event } = ctx
  const { generate } = useUUID()
  const { lucia } = useLucia()
  const { username, password, passwordConfirmation } = input
  if (password !== passwordConfirmation) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'error.registration.password.mismatch',
    })
  }
  const hashedPassword = await new Argon2id().hash(password)
  let user: UserSelect | undefined
  try {
    const users = await db
      .insert(userTable)
      .values({
        id: generate(),
        username,
        password: hashedPassword,
      })
      .returning()
    user = users[0]
  } catch (error: any) {
    if (error.code === '23505') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'error.registration.username.exists',
      })
    }
  }
  if (!user) {
    throw new Error('error.registration.user.failed')
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

export const registration = publicProcedure.input(inputFormat).mutation(handler)
