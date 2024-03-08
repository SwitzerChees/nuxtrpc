import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan, type Session, type User } from 'lucia'
import { H3Event } from 'h3'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { sessionTable, userTable } from '~/server/database/schema'
import * as schema from '~/server/database/schema'

declare module 'lucia' {
  interface Register {
    Lucia: typeof _lucia
    DatabaseUserAttributes: schema.UserSelect
  }
}

let _lucia: Lucia

export const useLucia = () => {
  const initialize = (db: NodePgDatabase<typeof schema>) => {
    if (_lucia) return
    const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)
    _lucia = new Lucia(adapter, {
      sessionExpiresIn: new TimeSpan(4, 'w'), // 4 weeks
      sessionCookie: {
        attributes: {
          secure: process.env.NODE_ENV === 'production',
        },
      },
      getUserAttributes: (attributes) => {
        return {
          id: attributes.id,
          username: attributes.username,
        }
      },
    })
  }

  const getUserSession = async (event: H3Event) => {
    if (!_lucia) return { user: undefined, session: undefined }
    const cookieHeader = getRequestHeader(event, 'Cookie')
    if (!cookieHeader) return { user: undefined, session: undefined }
    const sessionId = _lucia.readSessionCookie(cookieHeader ?? '')
    let session: Session | undefined
    let user: User | undefined
    if (sessionId) {
      const sessionValidation = await _lucia.validateSession(sessionId)
      session = sessionValidation.session || undefined
      user = sessionValidation.user || undefined
    }
    return { user, session }
  }

  return { lucia: _lucia, initialize, getUserSession }
}
