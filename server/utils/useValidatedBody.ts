import { H3Event, readRawBody } from 'h3'
import { parse } from 'superjson'
import * as zod from 'zod'
import { z } from 'zod'
import type { ParseOptions, ParsedData, ValidationSchema } from '~/types'

export default async function useValidatedBody<T extends ValidationSchema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const rawBody = await readRawBody(event)
    let body = !rawBody ? {} : parse<T>(rawBody)
    if (!body && rawBody) body = JSON.parse(rawBody)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = await finalSchema.parseAsync(body, parseOptions)
    return parsed
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'zod.input.invalid',
      data: (error as zod.ZodError).issues,
    })
  }
}
