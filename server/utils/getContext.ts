import { type UserRole, UserRoles } from '~/types'

const getContext = (event: H3Event) => {
  const hasRole = (role: UserRole) => {
    const user = event.context.user
    if (!user) return false
    return user.roles.includes(role)
  }

  const isAdmin = () => hasRole(UserRoles.Admin)
  return { ...event.context, hasRole, isAdmin }
}
export default getContext
