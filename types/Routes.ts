import type { APIGetHelloOutput, APIGetHelloInput } from '~/server/api/hello.get'
import type { APIPostHelloInput, APIPostHelloOutput } from '~/server/api/hello.post'
import type { APIParamHelloInput, APIParamHelloOutput } from '~/server/api/hello/[name]'

type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type BaseAPIRoute<TInput, TOutput> = {
  Path: string
  Method: APIMethod
  Input?: TInput
  Output?: TOutput
}

export const APIRoutes = {
  Hello: {
    Post: {
      Path: '/api/hello',
      Method: 'POST' as APIMethod,
      Input: {} as APIPostHelloInput,
      Output: {} as APIPostHelloOutput,
    },
    Get: {
      Path: '/api/hello',
      Method: 'GET' as APIMethod,
      Input: {} as APIGetHelloInput,
      Output: {} as APIGetHelloOutput,
    },
    ByName: {
      Path: '/api/hello/[name]',
      Method: 'GET' as APIMethod,
      Input: {} as APIParamHelloInput,
      Output: {} as APIParamHelloOutput,
    },
  },
}
