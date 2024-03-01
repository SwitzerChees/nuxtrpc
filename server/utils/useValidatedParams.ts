import { H3Event, getRouterParams } from 'h3'
import * as zod from 'zod'
import { z } from 'zod'
import { ParseOptions, ParsedData, ValidationSchema, createBadRequest } from '~/types'

export default async function useValidatedParams<T extends ValidationSchema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const params = getRouterParams(event)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = await finalSchema.parseAsync(params, parseOptions)
    return parsed
  } catch (error) {
    throw createBadRequest(error as zod.ZodError)
  }
}
