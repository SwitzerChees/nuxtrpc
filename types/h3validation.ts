import { createError } from 'h3'
import * as zod from 'zod'
import { z } from 'zod'

export type UnknownKeysParam = 'passthrough' | 'strict' | 'strip'
export type ValidationSchema<U extends UnknownKeysParam = any> =
  | z.ZodObject<any, U>
  | z.ZodUnion<[ValidationSchema<U>, ...ValidationSchema<U>[]]>
  | z.ZodIntersection<ValidationSchema<U>, ValidationSchema<U>>
  | z.ZodDiscriminatedUnion<string, z.ZodObject<any, U>[]>
  | z.ZodEffects<z.ZodTypeAny>
export type ParsedData<T extends ValidationSchema | z.ZodRawShape> = T extends ValidationSchema
  ? z.output<T>
  : T extends z.ZodRawShape
    ? z.output<z.ZodObject<T>>
    : never
export type ParseOptions = Partial<z.ParseParams>

export const DEFAULT_ERROR_MESSAGE = 'Bad Request'
export const DEFAULT_ERROR_STATUS = 400
export function createBadRequest(error: zod.ZodError) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusText: DEFAULT_ERROR_MESSAGE,
    data: error,
  })
}
