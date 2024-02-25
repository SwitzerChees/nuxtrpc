import { z } from 'zod'
import { publicProcedure } from '~/server/trpc/trpc'
import { HandlerContext } from '~/types'

const inputFormat = z.object({})

type Input = z.infer<typeof inputFormat>

async function handler({ ctx }: HandlerContext<Input>) {
  const { db, user } = ctx
  if (!user) return null
  const myUser = await db.query.userTable.findFirst({
    where: (users, { eq }) => eq(users.id, user?.id),
  })
  if (!myUser) return null
  return myUser
}

export const myUser = publicProcedure.input(inputFormat).query(handler)
