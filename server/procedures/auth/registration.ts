import { z } from 'zod'
import { setCookie } from 'h3'
import { Argon2id } from 'oslo/password'
import { useUUID } from '../../utils/uuid'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'
import { userTable } from '~/server/database/schema'

const inputFormat = z.object({
  username: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx, input }: HandlerContext<Input>) {
  const { db, event } = ctx
  const { generate } = useUUID()
  const { lucia } = useLucia()
  const { username, password, passwordConfirmation } = input
  if (password !== passwordConfirmation) {
    throw new Error('Passwords do not match')
  }
  const hashedPassword = await new Argon2id().hash(password)
  const users = await db
    .insert(userTable)
    .values({
      id: generate(),
      username,
      password: hashedPassword,
    })
    .returning()
  const user = users[0]
  if (!user) {
    throw new Error('Failed to create user')
  }
  const session = await lucia.createSession(user.id, {})
  if (!session) {
    throw new Error('Failed to create session')
  }
  const sessionCookie = await lucia.createSessionCookie(session.id)
  if (!sessionCookie) {
    throw new Error('Failed to create session cookie')
  }
  setCookie(event, sessionCookie.name, sessionCookie.value)
  return true
}

export const registration = publicProcedure.input(inputFormat).mutation(handler)
