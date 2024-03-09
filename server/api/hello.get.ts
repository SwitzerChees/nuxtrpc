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

export default defineEventHandler((event: H3Event) => {
  const input = useValidatedQuery(event, inputFormat)
  const { hasRole } = useUserSession()
  if (!hasRole(event, 'admin')) {
    throw createError({
      statusCode: 403,
      message: 'error.unauthorized',
    })
  }
  const myOutput = { hello: `Hello, ${input.name}!` }
  const output = useValidatedOutput(myOutput, outputFormat)
  return output
})
