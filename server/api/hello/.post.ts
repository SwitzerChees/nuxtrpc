import { H3Event } from 'h3'
import { serialize } from 'superjson'
import { z } from 'zod'
// import { z, zh } from 'h3-zod'

const inputFormat = z.object({
  name: z.string().min(3).max(32),
  timestamp: z.date(),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
  timestamp: z.date(),
})

export type APIPostHelloInput = z.infer<typeof inputFormat>
export type APIPostHelloOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  // const input = await zh.useValidatedBody(event, inputFormat)
  const input = await useValidatedBody(event, inputFormat)
  console.log(typeof input.timestamp)
  return serialize(
    outputFormat.parse({
      timestamp: input.timestamp,
      hello: `Hello, ${input.name}!`,
    }),
  )
})
