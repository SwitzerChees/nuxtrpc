import { Argon2id } from 'oslo/password'

const inputFormat = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(64),
})

const outputFormat = z.object({
  username: z.string().min(3).max(32),
})

export type APIAuthLoginInput = zinfer<typeof inputFormat>
export type APIAuthLoginOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, validateInput } = context.get(event)
  const input = await validateInput(inputFormat)
  const { username, password } = input

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
  await usersession.create(event, user)
  return validate.output(input, outputFormat)
})
