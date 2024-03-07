import type { APIMethod } from '.'
import type { APIUserGetInput, APIUserGetOutput } from '~/server/api/user.get'
import type { APIUserMyOuserOutput } from '~/server/api/user/myuser.get'

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
}

export default User
