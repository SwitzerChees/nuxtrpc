import { fileTable } from '~/server/database/schema'

const outputFormat = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    hash: z.string(),
    type: z.string(),
  }),
)

export type APIUploadPostOutput = zinfer<typeof outputFormat>

export default defineEventHandler(async (event: H3Event) => {
  const { isAuthenticated, checkAuthorized, db } = context.get(event)
  await checkAuthorized(isAuthenticated)
  const files = await readMultipartFormData(event)
  if (!files) {
    throw createError({
      statusCode: 400,
      message: 'error.file.uploadNoFiles',
    })
  }
  const newFiles: APIUploadPostOutput = []
  for (const file of files) {
    const newFile = await db
      .insert(fileTable)
      .values({
        name: file.name || 'nameless file',
        url: file.name + new Date().getTime().toString(),
        hash: file.name,
        type: file.type,
      } as any)
      .returning()
    newFiles.push(newFile[0])
  }
  return validate.output(newFiles, outputFormat)
})
