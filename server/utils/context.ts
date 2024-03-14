import { z } from 'zod'
import { type UserRole, UserRoles, type ValidationSchema } from '~/types'

const get = (event: H3Event) => {
  const hasRole = (role: UserRole) => {
    const user = event.context.user
    if (!user) return false
    return user.roles.includes(role)
  }

  const validateInput = <T extends ValidationSchema | z.ZodRawShape>(schema: T) => {
    if (event.method === 'GET') return validate.query(event, schema)
    return validate.body(event, schema)
  }

  const checkAuthorized = async (isAuthorized: () => Promise<boolean> | boolean) => {
    if (!(await isAuthorized())) {
      throw createError({
        statusCode: 403,
        message: 'error.unauthorized',
      })
    }
  }

  const isAdmin = () => hasRole(UserRoles.Admin)

  return { ...event.context, hasRole, isAdmin, validateInput, checkAuthorized }
}
export default { get }
