import { APIRoutes, type User } from '~/types'

const _user = ref<User | null>(null)

export const useUser = () => {
  const fetchUser = async () => {
    const user = await useFetch<User>(APIRoutes.User.MyUser.Path)
    if (!user.data.value) return
    _user.value = user.data.value
  }

  return { user: _user, fetchUser }
}
