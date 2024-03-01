import { H3Event } from 'h3'
import { z } from 'h3-zod'

const inputFormat = z.object({
  name: z.string().min(3).max(32),
  timestamp: z.date(),
  person: z.object({
    age: z.number().int().positive(),
  }),
  hobbies: z.set(z.string()),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
})

export type APIHelloGetInput = z.infer<typeof inputFormat>
export type APIHelloGetOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = await useValidatedQuery(event, inputFormat)
  const myOutput = { hello: `Hello, ${input.name}!` }
  const output = await useValidatedOutput(myOutput, outputFormat)
  return output
})
