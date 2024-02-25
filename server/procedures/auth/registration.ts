import { z } from 'zod'
import { Argon2id } from 'oslo/password'
import { TRPCError } from '@trpc/server'
import { generateUUID } from '../../utils/uuid'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'
import { userTable } from '~/server/database/schema'

const inputFormat = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(64),
  passwordConfirmation: z.string(),
})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx, input }: HandlerContext<Input>) {
  const { db } = ctx
  const { username, password, passwordConfirmation } = input
  if (password !== passwordConfirmation) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'error.registration.password.mismatch',
    })
  }
  let user = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })
  if (user) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'error.registration.user.exists',
    })
  }
  const hashedPassword = await new Argon2id().hash(password)
  const users = await db
    .insert(userTable)
    .values({
      id: generateUUID(),
      username,
      password: hashedPassword,
    })
    .returning()
  user = users[0]
  if (!user) {
    throw new Error('error.registration.user.failed')
  }
  return true
}

export const registration = publicProcedure.input(inputFormat).mutation(handler)
