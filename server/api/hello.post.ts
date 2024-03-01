import { H3Event } from 'h3'
import { z } from 'zod'

const inputFormat = z.object({
  name: z.string().min(3).max(32),
  timestamp: z.date(),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
  timestamp: z.date(),
})

export type APIHelloPostInput = z.infer<typeof inputFormat>
export type APIHelloPostOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = await useValidatedBody(event, inputFormat)
  const myOutput = { hello: `Hello, ${input.name}!`, timestamp: new Date() }
  const output = await useValidatedOutput(myOutput, outputFormat)
  return output
})
