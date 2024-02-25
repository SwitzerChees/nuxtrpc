import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, Session, TimeSpan, User } from 'lucia'
import { H3Event } from 'h3'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { sessionTable, userTable } from '~/server/database/schema'
import * as schema from '~/server/database/schema'

interface DatabaseUserAttributes {
  username: string
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof _lucia
    DatabaseUserAttributes: DatabaseUserAttributes
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
          username: attributes.username,
        }
      },
    })
  }

  const getUserSession = async (event: H3Event) => {
    const cookieHeader = getRequestHeader(event, 'Cookie')
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
