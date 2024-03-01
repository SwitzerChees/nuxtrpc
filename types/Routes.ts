import type { APIHelloGetOutput, APIHelloGetInput } from '~/server/api/hello.get'
import type { APIHelloPostInput, APIHelloPostOutput } from '~/server/api/hello.post'
import type { APIHelloByNameInput, APIHelloByNameOutput } from '~/server/api/hello/[name]'
import type { APIAuthLoginInput, APIAuthLoginOutput } from '~/server/api/auth/login'
import type { APIAuthRegistrationInput, APIAuthRegistrationOutput } from '~/server/api/auth/registration'
import type { APIAuthLogoutOutput } from '~/server/api/auth/logout'
import type { APIUserGetInput, APIUserGetOutput } from '~/server/api/user.get'
import type { APIUserMyOuserOutput } from '~/server/api/user/myuser.get'

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
    Registration: {
      Path: '/api/auth/registration',
      Method: 'POST' as APIMethod,
      Input: {} as APIAuthRegistrationInput,
      Output: {} as APIAuthRegistrationOutput,
    },
    Logout: {
      Path: '/api/auth/logout',
      Method: 'POST' as APIMethod,
      Output: {} as APIAuthLogoutOutput,
    },
  },
  User: {
    Get: {
      Path: '/api/user',
      Method: 'GET' as APIMethod,
      Input: {} as APIUserGetInput,
      Output: {} as APIUserGetOutput,
    },
    MyUser: {
      Path: '/api/user/myuser',
      Method: 'GET' as APIMethod,
      Output: {} as APIUserMyOuserOutput,
    },
  },
}
