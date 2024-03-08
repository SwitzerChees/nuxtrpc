import 'h3'
import * as schema from '~/server/database/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import pino from 'pino'

declare module 'h3' {
  interface H3EventContext {
    user: schema.UserSelect | undefined
    session: schema.SessionSelect | undefined
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
