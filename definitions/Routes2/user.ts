import type { APIMethod } from '.'
import type { APIUserGetInput, APIUserGetOutput } from '~/server/api/user/index.get'
import type { APIUserMyOuserOutput } from '~/server/api/user/myuser.get'
import type { APISessionsByUserIdInput, APISessionsByUserIdOutput } from '~/server/api/user/sessions.get'

const User = {
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
  Sessions: {
    Path: '/api/user/sessions',
    Method: 'GET' as APIMethod,
    Input: {} as APISessionsByUserIdInput,
    Output: {} as APISessionsByUserIdOutput,
  },
}

export default User
