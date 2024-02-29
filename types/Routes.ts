import type { APIGetHelloOutput, APIGetHelloInput } from '~/server/api/hello/.get'
import type { APIPostHelloInput, APIPostHelloOutput } from '~/server/api/hello/.post'
import type { APIParamHelloOutput } from '~/server/api/hello/[name]'

type APIRouteBase<TInput = undefined, TOutput = any> = {
  Path: string
  Method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  Input?: TInput
  Output: TOutput
}

export const APIRoutes = {
  HelloPost: {
    Path: '/api/hello',
    Method: 'POST',
    Input: {} as APIPostHelloInput,
    Output: {} as APIPostHelloOutput,
  },
  HelloGet: {
    Path: '/api/hello',
    Method: 'GET',
    Input: {} as APIGetHelloInput,
    Output: {} as APIGetHelloOutput,
  },
  HelloParam: {
    Path: '/api/hello/[name]',
    Method: 'GET',
    Output: {} as APIParamHelloOutput,
  },
} as const

export type APIRoute = {
  [K in keyof typeof APIRoutes]: APIRouteBase<
    'Input' extends keyof (typeof APIRoutes)[K] ? (typeof APIRoutes)[K]['Input'] : undefined,
    (typeof APIRoutes)[K]['Output']
  >
}[keyof typeof APIRoutes]
