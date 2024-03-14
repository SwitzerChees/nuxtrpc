import { Argon2id } from 'oslo/password'
import { userTable } from '~/server/database/schema'

const inputFormat = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(64),
  passwordConfirmation: z.string(),
})

const outputFormat = z.object({
  username: z.string().min(3).max(32),
})

export type APIAuthRegistrationInput = zinfer<typeof inputFormat>
export type APIAuthRegistrationOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { db, validateInput } = getContext(event)
  const input = await validateInput(inputFormat)
  const { username, password, passwordConfirmation } = input
  if (password !== passwordConfirmation) {
    throw createError({
      statusCode: 400,
      message: 'error.registration.password.mismatch',
    })
  }
  let user = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })
  if (user) {
    throw createError({
      statusCode: 400,
      message: 'error.registration.user.exists',
    })
  }
  const hashedPassword = await new Argon2id().hash(password)
  const users = await db
    .insert(userTable)
    .values({
      username,
      password: hashedPassword,
    })
    .returning()
  user = users[0]
  if (!user) {
    throw createError({
      statusCode: 500,
      message: 'error.registration.user.failed',
    })
  }
  return validate.output(input, outputFormat)
})
