import { H3Event } from 'h3'
import { z, zh } from 'h3-zod'

const inputFormat = z.object({
  name: z.string().min(3).max(32),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
})

export type APIParamHelloInput = z.infer<typeof inputFormat>
export type APIParamHelloOutput = z.infer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = await zh.useValidatedParams(event, inputFormat)
  return outputFormat.parse({
    hello: `Hello, ${input.name}!`,
  })
})
