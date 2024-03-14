import type { APIMethod } from '.'
import type { APIHelloGetOutput, APIHelloGetInput } from '~/server/api/hello/index.get'
import type { APIHelloPostInput, APIHelloPostOutput } from '~/server/api/hello/index.post'
import type { APIHelloByNameInput, APIHelloByNameOutput } from '~/server/api/hello/[name]'

const Hello = {
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
}

export default Hello
