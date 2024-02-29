import { H3Event, createError, readRawBody } from 'h3'
import { parse } from 'superjson'
import * as zod from 'zod'
import { z } from 'zod'
export { z } from 'zod'

type UnknownKeysParam = 'passthrough' | 'strict' | 'strip'
type Schema<U extends UnknownKeysParam = any> =
  | z.ZodObject<any, U>
  | z.ZodUnion<[Schema<U>, ...Schema<U>[]]>
  | z.ZodIntersection<Schema<U>, Schema<U>>
  | z.ZodDiscriminatedUnion<string, z.ZodObject<any, U>[]>
  | z.ZodEffects<z.ZodTypeAny>
type ParsedData<T extends Schema | z.ZodRawShape> = T extends Schema
  ? z.output<T>
  : T extends z.ZodRawShape
    ? z.output<z.ZodObject<T>>
    : never
type ParseOptions = Partial<z.ParseParams>

const DEFAULT_ERROR_MESSAGE = 'Bad Request'
const DEFAULT_ERROR_STATUS = 400
function createBadRequest(error: zod.ZodError) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusText: DEFAULT_ERROR_MESSAGE,
    data: error,
  })
}

export default async function useValidatedBody<T extends Schema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const rawBody = await readRawBody(event)
    const body = !rawBody ? {} : await parse<T>(rawBody)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = await finalSchema.parseAsync(body, parseOptions)
    return parsed
  } catch (error) {
    throw createBadRequest(error as zod.ZodError)
  }
}
