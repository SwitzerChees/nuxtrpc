const inputFormat = z.object({
  name: z.string().min(3).max(32),
  timestamp: z.date(),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
  timestamp: z.date(),
})

export type APIHelloPostInput = zinfer<typeof inputFormat>
export type APIHelloPostOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const input = await validateBody(event, inputFormat)
  const myOutput = { hello: `Hello, ${input.name}!`, timestamp: new Date() }
  const output = validateOutput(myOutput, outputFormat)
  return output
})
