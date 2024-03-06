export default defineNuxtPlugin(async () => {
  const user = useMyUser()

  if (!user.value) {
    const { fetchUser } = useAuth()

    await fetchUser()
  }
})
