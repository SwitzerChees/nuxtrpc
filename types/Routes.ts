import type { APIHelloGetOutput, APIHelloGetInput } from '~/server/api/hello.get'
import type { APIHelloPostInput, APIHelloPostOutput } from '~/server/api/hello.post'
import type { APIHelloByNameInput, APIHelloByNameOutput } from '~/server/api/hello/[name]'
import type { APIAuthLoginInput, APIAuthLoginOutput } from '~/server/api/auth/login'

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
      Input: {} as APIHelloPostInput,
      Output: {} as APIHelloPostOutput,
    },
    Get: {
      Path: '/api/hello',
      Method: 'GET' as APIMethod,
      Input: {} as APIHelloGetInput,
      Output: {} as APIHelloGetOutput,
    },
    ByName: {
      Path: '/api/hello/[name]',
      Method: 'GET' as APIMethod,
      Input: {} as APIHelloByNameInput,
      Output: {} as APIHelloByNameOutput,
    },
  },
  Auth: {
    Login: {
      Path: '/api/auth/login',
      Method: 'POST' as APIMethod,
      Input: {} as APIAuthLoginInput,
      Output: {} as APIAuthLoginOutput,
    },
  },
}
