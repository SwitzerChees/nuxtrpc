import type { User } from '~/types'

const _user = ref<User | null>(null)

export const useUser = () => {
  const { $client } = useNuxtApp()

  const myUserQuery = $client.user.myUser.useQuery({})

  const fetchUser = async () => {
    await myUserQuery.execute()
    if (!myUserQuery.data.value) return
    _user.value = myUserQuery.data.value
  }

  return { user: _user, fetchUser }
}
