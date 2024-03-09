import { H3Event, getRouterParams } from 'h3'
import * as zod from 'zod'
import { z } from 'zod'
import type { ParseOptions, ParsedData, ValidationSchema } from '~/types'

export default function validateParams<T extends ValidationSchema | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): ParsedData<T> {
  try {
    const params = getRouterParams(event)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = finalSchema.parse(params, parseOptions)
    return parsed
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'zod.input.invalid',
      data: (error as zod.ZodError).issues,
    })
  }
}
