import { H3Event, readRawBody } from 'h3'
import { type SuperJSONResult, parse, serialize } from 'superjson'
import * as zod from 'zod'
import { z } from 'zod'
import type { ParseOptions, ParsedData, ValidationSchema } from '~/types'

async function validateBody<T extends ValidationSchema | z.ZodRawShape>(
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

function validateQuery<T extends ValidationSchema | z.ZodRawShape>(event: H3Event, schema: T, parseOptions?: ParseOptions): ParsedData<T> {
  try {
    const rawQuery = getQuery(event) as any
    const cleanQuery = {
      json: rawQuery.json ? JSON.parse(rawQuery.json) : {},
      meta: rawQuery.meta ? JSON.parse(rawQuery.meta) : undefined,
    }
    const query = parse(JSON.stringify(cleanQuery))
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

function validateParams<T extends ValidationSchema | z.ZodRawShape>(event: H3Event, schema: T, parseOptions?: ParseOptions): ParsedData<T> {
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

function validateOutput<T extends zod.ZodType<any, any>>(output: z.infer<T>, schema: T, parseOptions?: ParseOptions): SuperJSONResult {
  try {
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    const parsed = finalSchema.parse(output, parseOptions)
    return serialize(parsed)
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'zod.input.invalid',
      data: (error as zod.ZodError).issues,
    })
  }
}

export default { body: validateBody, query: validateQuery, params: validateParams, output: validateOutput }
