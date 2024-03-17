const outputFormat = z.object({
  hello: z.string().min(3).max(32),
  timestamp: z.date(),
})

export type APIUploadPostOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { isAuthenticated, checkAuthorized } = context.get(event)
  await checkAuthorized(isAuthenticated)
  //   const files = await readMultipartFormData(event)
  //   console.log(files)
  return { hello: 'world', timestamp: new Date() }
  //   const output = validate.output(myOutput, outputFormat)
  //   return output
})
