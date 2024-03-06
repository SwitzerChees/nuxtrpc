import type { SuperJSONResult } from 'superjson'
import { type User } from '~/types'

export const useAuth = () => {
  const user = useMyUser()

  const fetchUser = async () => {
    const fetchResult = await useFetch<SuperJSONResult>(APIRoutes.User.MyUser.Path)
    if (fetchResult.data?.value?.json) {
      user.value = fetchResult.data.value?.json as User
    }
    return user
  }

  return { fetchUser }
}
