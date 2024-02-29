export const useDebounce = (fn: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (...args: any[]) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
