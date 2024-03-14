import type { APIMethod } from '.'
import type { APIAuthLoginInput, APIAuthLoginOutput } from '~/server/api/auth/login'
import type { APIAuthRegistrationInput, APIAuthRegistrationOutput } from '~/server/api/auth/registration'
import type { APIAuthLogoutOutput } from '~/server/api/auth/logout'

const Auth = {
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
}

export default Auth
