import { z } from 'zod'
import { type UserRole, UserRoles, type ValidationSchema } from '~/types'

const getContext = (event: H3Event) => {
  const hasRole = (role: UserRole) => {
    const user = event.context.user
    if (!user) return false
    return user.roles.includes(role)
  }

  const validateInput = <T extends ValidationSchema | z.ZodRawShape>(schema: T) => {
    if (event.method === 'GET') return validateQuery(event, schema)
    return validateBody(event, schema)
  }

  const isAdmin = () => hasRole(UserRoles.Admin)

  return { ...event.context, hasRole, isAdmin, validateInput }
}
export default getContext