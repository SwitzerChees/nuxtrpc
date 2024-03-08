import { H3Event } from 'h3'
import { Argon2id } from 'oslo/password'
import { z } from 'zod'

const inputFormat = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(64),
})

const outputFormat = z.object({
  username: z.string().min(3).max(32),
})

export type APIAuthLoginInput = z.infer<typeof inputFormat>
export type APIAuthLoginOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = await useValidatedBody(event, inputFormat)
  const { username, password } = input
  const { db } = event.context

  const user = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })
  if (!user) {
    throw createError({
      statusCode: 400,
      message: 'error.login.user.notExists',
    })
  }
  const isPasswordValid = await new Argon2id().verify(user.password, password)
  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      message: 'error.login.password.invalid',
    })
  }
  const { createUserSession } = useUserSession()
  await createUserSession(event, user)
  return useValidatedOutput(input, outputFormat)
})
