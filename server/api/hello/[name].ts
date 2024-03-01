import { H3Event } from 'h3'
import { z } from 'zod'

const inputFormat = z.object({
  name: z.string().min(3).max(32),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
})

export type APIHelloByNameInput = z.infer<typeof inputFormat>
export type APIHelloByNameOutput = z.infer<typeof outputFormat>

export default defineEventHandler((event: H3Event) => {
  const input = useValidatedParams(event, inputFormat)
  const myOutput = { hello: `Hello, ${input.name}!` }
  const output = useValidatedOutput(myOutput, outputFormat)
  return output
})
