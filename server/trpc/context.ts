import { H3Event } from 'h3'
import { useDrizzle } from '../utils/drizzle'
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (event: H3Event) => {
  const session = getCookie(event, 'session')
  const authorization = getRequestHeader(event, 'authorization')
  const db = useDrizzle().db
  return {
    user: authorization,
    session,
    db,
  }
}
