export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useUser()
  await fetchUser()
  // Redirect to login if not logged in
  if (!user.value && !(to.name === 'login' || to.name === 'registration')) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/login', { replace: true })
  }
  // Redirect to home or last page if logged in and trying to access login
  if (user.value && to.name === 'login') {
    return redirectLastPage()
  }
})

const redirectLastPage = () => {
  const cookie = useCookie('redirect', { path: '/' })
  if (cookie.value) {
    const redirect = cookie.value
    return navigateTo(redirect, { replace: true })
  }
  return navigateTo('/', { replace: true })
}
