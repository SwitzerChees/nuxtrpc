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

export type APIHelloGetInput = zinfer<typeof inputFormat>
export type APIHelloGetOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { validateInput } = getContext(event)
  const input = await validateInput(inputFormat)
  const myOutput = { hello: `Hello, ${input.name}!` }
  return validate.output(myOutput, outputFormat)
})
