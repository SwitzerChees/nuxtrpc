import { H3Event } from 'h3'
import { parse as superparse } from 'superjson'
import * as zod from 'zod'
import { z } from 'zod'
import { ParseOptions, ParsedData, ValidationSchema, createBadRequest } from '~/types'

export default async function useValidatedQuery<T extends ValidationSchema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const rawQuery = getQuery(event) as any
    const cleanQuery = {
      json: JSON.parse(rawQuery.json),
      meta: JSON.parse(rawQuery.meta),
    }
    const query = superparse(JSON.stringify(cleanQuery))
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = await finalSchema.parseAsync(query, parseOptions)
    return parsed
  } catch (error) {
    throw createBadRequest(error as zod.ZodError)
  }
}
