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
