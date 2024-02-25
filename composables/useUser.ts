import type { UserSelect } from '~/server/database/schema'

export const useUser = () => {
  const { $client } = useNuxtApp()

  const myUserQuery = $client.user.myUser.useQuery({})

  const user = ref<UserSelect | null>(null)

  const fetchUser = async () => {
    await myUserQuery.execute()
    if (!myUserQuery.data.value) return
    user.value = myUserQuery.data.value
  }

  return { user, fetchUser }
}
