import type { APIMethod } from '.'
import type { APIUserGetInput, APIUserGetOutput } from '~/server/api/user/index.get'
import type { APIUserMyUserOutput } from '~/server/api/user/myuser.get'
import type { APISessionsByUserIdInput, APISessionsByUserIdOutput } from '~/server/api/user/sessions.get'
import type { APIUserRolesPostInput, APIUserRolesPostOutput } from '~/server/api/user/roles.post'

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
    Output: {} as APIUserMyUserOutput,
  },
  Sessions: {
    Path: '/api/user/sessions',
    Method: 'GET' as APIMethod,
    Input: {} as APISessionsByUserIdInput,
    Output: {} as APISessionsByUserIdOutput,
  },
  Roles: {
    Path: '/api/user/roles',
    Method: 'POST' as APIMethod,
    Input: {} as APIUserRolesPostInput,
    Output: {} as APIUserRolesPostOutput,
  },
}

export default User
