import { H3Event } from 'h3'
import { parse as superparse } from 'superjson'
import * as zod from 'zod'
import { z } from 'zod'
import type { ParseOptions, ParsedData, ValidationSchema } from '~/types'

export default function useValidatedQuery<T extends ValidationSchema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): ParsedData<T> {
  try {
    const rawQuery = getQuery(event) as any
    const cleanQuery = {
      json: JSON.parse(rawQuery.json),
      meta: rawQuery.meta ? JSON.parse(rawQuery.meta) : undefined,
    }
    const query = superparse(JSON.stringify(cleanQuery))
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = finalSchema.parse(query, parseOptions)
    return parsed
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'zod.input.invalid',
      data: (error as zod.ZodError).issues,
    })
  }
}
