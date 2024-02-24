import { H3Event } from 'h3'
import { useDrizzle } from '../utils/drizzle'
import { useLucia } from '../utils/lucia'
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (event: H3Event) => {
  const { getUserSession } = useLucia()
  const { user, session } = await getUserSession(event)

  const db = useDrizzle().db
  return {
    user,
    session,
    db,
    event,
  }
}
