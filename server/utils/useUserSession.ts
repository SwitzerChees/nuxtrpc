import { eq } from 'drizzle-orm'
import { H3Event } from 'h3'
import { generateRandomString, alphabet, sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'
import { type UserSelect, type SessionSelect, sessionTable } from '~/server/database/schema'
import type { User } from '~/types'

const useUserSession = () => {
  const getUserSession = async (event: H3Event) => {
    const {
      session: { cookieName },
    } = useEnv()
    const sessionToken = getCookie(event, cookieName)
    if (!sessionToken) return { session: undefined, user: undefined }
    const { db } = event.context
    const session = await db.query.sessionTable.findFirst({
      where: (session, { eq }) => eq(session.token, sessionToken),
      with: {
        user: {
          with: {
            userRoles: {
              with: {
                role: true,
              },
            },
          },
        },
      },
    })
    if (!session) return { session: undefined, user: undefined }
    const userSession: { session: SessionSelect; user: User } = {
      session: { id: session.id, userId: session.userId, expiresAt: session.expiresAt, token: session.token },
      user: {
        id: session.user.id,
        username: session.user.username,
        roles: session.user.userRoles.map((userRole) => userRole.role.name),
      },
    }
    return userSession
  }
  const createUserSession = async (event: H3Event, user: UserSelect) => {
    const { db } = event.context
    const { session } = useEnv()
    const tokenData = new TextEncoder().encode(generateRandomString(64, alphabet('a-z', '0-9', 'A-Z')))
    const token = encodeHex(await sha256(tokenData))
    await db
      .insert(sessionTable)
      .values({
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + session.timeoutDays),
      })
      .returning()
    setSessionCookie(event, token)
  }

  const refreshUserSession = async (event: H3Event) => {
    const { session, db } = event.context
    if (!session) return
    const {
      session: { timeoutDays, refreshDays },
    } = useEnv()
    if (session.expiresAt.getTime() - Date.now() > refreshDays) return
    session.expiresAt = new Date(Date.now() + timeoutDays)
    await db.update(sessionTable).set({ expiresAt: session.expiresAt }).where(eq(sessionTable.id, session.id))
    setSessionCookie(event, session.token)
  }

  const setSessionCookie = (event: H3Event, token: string) => {
    const {
      isProd,
      session: { cookieName, timeoutDays },
    } = useEnv()
    const timeoutSeconds = timeoutDays / 1000
    setCookie(event, cookieName, token, { maxAge: timeoutSeconds, secure: isProd, httpOnly: isProd, sameSite: 'lax' })
  }

  const removeUserSession = async (event: H3Event) => {
    const { session, db } = event.context
    if (session) {
      await db.delete(sessionTable).where(eq(sessionTable.id, session.id))
    }
    const {
      session: { cookieName },
    } = useEnv()
    setCookie(event, cookieName, '', { maxAge: 0 })
  }

  const hasRole = (event: H3Event, role: 'admin') => {
    const user = event.context.user
    if (!user) return false
    return user.roles.includes(role)
  }

  const isAdmin = (event: H3Event) => hasRole(event, 'admin')

  return { getUserSession, createUserSession, refreshUserSession, removeUserSession, hasRole, isAdmin }
}
export default useUserSession
