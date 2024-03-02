import type { SuperJSONResult } from 'superjson'
import { type User } from '~/types'

const _user = ref<User | null>(null)

export const useUser = () => {
  const fetchUser = async () => {
    const user = await useFetch<SuperJSONResult>(APIRoutes.User.MyUser.Path)
    if (!user.data.value) return
    _user.value = user.data.value.json as User
  }

  return { user: _user, fetchUser }
}
