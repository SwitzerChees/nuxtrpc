export default defineNuxtRouteMiddleware(async (to) => {
  const myUser = useMyUser()
  // Redirect to login if not logged in
  if (!myUser.value && !(to.name === 'login' || to.name === 'registration')) {
    if (!to.fullPath.startsWith('_nuxt')) {
      useCookie('redirect', { path: '/' }).value = to.fullPath
    }
    return await navigateTo('/login', { replace: true })
  }
  // Redirect to home or last page if logged in and trying to access login
  if (myUser.value && to.name === 'login') {
    return await redirectLastPage()
  }
})

const redirectLastPage = async () => {
  const cookie = useCookie('redirect', { path: '/' })
  if (cookie.value) {
    const redirect = cookie.value
    return await navigateTo(redirect, { replace: true })
  }
  return await navigateTo('/', { replace: true })
}
