/**
 * This can be used to create a reactive object that is stored in a cookie for proper SSR hydration.
 * ⚠️: Only use this in setup functions because it uses the `useRoute` hook.
 * @param input - The object to be made reactive
 * @returns Reactive object
 */
export const useSSReactive = <T extends object>(key: string, input?: T) => {
  const route = useRoute()
  const cookie = useCookie<T>(key, {
    default: () => input || ({} as T),
    path: route.path,
  })

  return cookie.value
}
