import Auth from './auth'
import Hello from './hello'
import User from './user'
import File from './file'
export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type BaseAPIRoute<TInput, TOutput> = {
  Path: string
  Method: APIMethod
  Input?: TInput
  Output?: TOutput
}

export const APIRoutes = {
  Auth,
  Hello,
  User,
  File,
}
