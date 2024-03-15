/**
 * This can be used to create a reactive reference that is stored in a cookie for proper SSR hydration.
 * ⚠️: Only use this in setup functions because it uses the `useRoute` hook.
 * @param input - The reference to be made reactive
 * @returns Reactive reference
 */
export const useSSRef = <T>(key: string, input?: T) => {
  const route = useRoute()
  const cookie = useCookie<T | undefined>(key, {
    default: () => input,
    path: route.path,
  })

  return cookie
}
