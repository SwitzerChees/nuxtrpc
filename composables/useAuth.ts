import type { SuperJSONResult } from 'superjson'
import { UserRoles, type User, type UserRole } from '~/definitions'

export const useAuth = () => {
  const user = useMyUser()

  const fetchUser = async () => {
    const fetchResult = await useFetch<SuperJSONResult>(APIRoutes.User.MyUser.Path)
    if (fetchResult.data?.value?.json) {
      user.value = fetchResult.data.value?.json as User
    }
    return user
  }

  const hasRole = (role: UserRole) => {
    if (!user.value) return false
    return user.value.roles.includes(role)
  }

  const isAdmin = computed(() => hasRole(UserRoles.Admin))

  return { fetchUser, hasRole, isAdmin }
}
