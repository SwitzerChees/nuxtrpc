import 'h3'
import type { Session, User } from 'lucia'
import * as schema from '~/server/database/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import pino from 'pino'

declare module 'h3' {
  interface H3EventContext {
    session: Session | undefined
    user: User | undefined
    db: NodePgDatabase<typeof schema>
    request: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'
      path: string
      start: number
      requestId: string
    }
    logger: pino.Logger
  }
}
