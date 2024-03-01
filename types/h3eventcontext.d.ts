import 'h3'
import type { Session, User } from 'lucia'
import * as schema from '~/server/database/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

declare module 'h3' {
  interface H3EventContext {
    session: Session | undefined
    user: User | undefined
    db: NodePgDatabase<typeof schema>
  }
}
