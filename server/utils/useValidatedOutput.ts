import type { SuperJSONResult } from 'superjson'
import { serialize } from 'superjson'
import * as zod from 'zod'
import { z } from 'zod'
import { ParseOptions } from '~/types'

export default function useValidatedOutput<T extends zod.ZodType<any, any>>(
  output: z.infer<T>,
  schema: T,
  parseOptions?: ParseOptions,
): SuperJSONResult {
  try {
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = finalSchema.parse(output, parseOptions)
    return serialize(parsed)
  } catch (error) {
    throw createError(error as zod.ZodError)
  }
}
