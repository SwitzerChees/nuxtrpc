import { eq } from 'drizzle-orm'
import { generateRandomString, alphabet, sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'
import { type UserSelect, type SessionSelect, sessionTable } from '~/server/database/schema'
import type { User } from '~/definitions'

const get = async (event: H3Event) => {
  const {
    session: { cookieName },
  } = env.config()
  const sessionToken = getCookie(event, cookieName)
  if (!sessionToken) return { session: undefined, user: undefined }
  const { db } = context.get(event)
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
    session,
    user: {
      id: session.user.id,
      username: session.user.username,
      roles: session.user.userRoles.map((userRole) => userRole.role.name),
    },
  }
  return userSession
}
const create = async (event: H3Event, user: UserSelect) => {
  const { db } = context.get(event)
  const { session } = env.config()
  const tokenData = new TextEncoder().encode(generateRandomString(64, alphabet('a-z', '0-9', 'A-Z')))
  const token = encodeHex(await sha256(tokenData))
  const headers = getHeaders(event)
  const platform = headers['sec-ch-ua-platform']?.replace(/"/g, '')
  const browser = headers['sec-ch-ua']?.replace(/"/g, '')
  const ip = headers['x-real-ip']?.replace(/"/g, '') || headers['x-forwarded-for']?.replace(/"/g, '')
  const userAgent = headers['user-agent']?.replace(/"/g, '')
  await db
    .insert(sessionTable)
    .values({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + session.timeoutDays),
      platform,
      browser,
      ip,
      userAgent,
    })
    .returning()
  setSessionCookie(event, token)
}

const refresh = async (event: H3Event) => {
  const { session, db } = context.get(event)
  if (!session) return
  const {
    session: { timeoutDays, refreshDays },
  } = env.config()
  if (session.expiresAt.getTime() - Date.now() > refreshDays) return
  session.expiresAt = new Date(Date.now() + timeoutDays)
  await db.update(sessionTable).set({ expiresAt: session.expiresAt }).where(eq(sessionTable.id, session.id))
  setSessionCookie(event, session.token)
}

const setSessionCookie = (event: H3Event, token: string) => {
  const {
    isProd,
    session: { cookieName, timeoutDays },
  } = env.config()
  const timeoutSeconds = timeoutDays / 1000
  setCookie(event, cookieName, token, { maxAge: timeoutSeconds, secure: isProd, httpOnly: isProd, sameSite: 'lax' })
}

const remove = async (event: H3Event) => {
  const { session, db } = context.get(event)
  if (session) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id))
  }
  const {
    session: { cookieName },
  } = env.config()
  setCookie(event, cookieName, '', { maxAge: 0 })
}

export default { get, create, refresh, remove }
