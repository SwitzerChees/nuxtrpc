import type { APIHelloOutput, APIHelloInput } from '~/server/api/hello'

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
    Input: {} as APIHelloInput,
    Output: {} as APIHelloOutput,
  },
  HelloGet: {
    Path: '/api/hello',
    Method: 'GET',
    Output: {} as APIHelloOutput,
  },
} as const

export type APIRoute = {
  [K in keyof typeof APIRoutes]: APIRouteBase<
    'Input' extends keyof (typeof APIRoutes)[K] ? (typeof APIRoutes)[K]['Input'] : undefined,
    (typeof APIRoutes)[K]['Output']
  >
}[keyof typeof APIRoutes]
