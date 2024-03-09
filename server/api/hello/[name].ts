const inputFormat = z.object({
  name: z.string().min(3).max(32),
})

const outputFormat = z.object({
  hello: z.string().min(3).max(32),
})

export type APIHelloByNameInput = zinfer<typeof inputFormat>
export type APIHelloByNameOutput = zinfer<typeof outputFormat>

export default defineEventHandler((event: H3Event) => {
  const input = useValidatedParams(event, inputFormat)
  const myOutput = { hello: `Hello, ${input.name}!` }
  const output = useValidatedOutput(myOutput, outputFormat)
  return output
})
