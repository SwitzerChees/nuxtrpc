import { existsSync, promises as fs } from 'fs'
import crypto from 'crypto'
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { DefaultLogger, type LogWriter } from 'drizzle-orm'
import pg from 'pg'
import * as schema from '~/server/database/schema'

let _pool: pg.Pool
let _db: NodePgDatabase<typeof schema>

const useDrizzle = () => {
  if (!_pool) {
    const { database } = useEnv()
    // eslint-disable-next-line import/no-named-as-default-member
    _pool = new pg.Pool(database)
  }
  const connect = async () => {
    await _pool.connect()
    const logger = useLogger()
    const { logLevel } = useEnv()
    let totalQueries = 0
    const individualQueriesCounter: Record<string, number> = {}
    class DrizzleLogWriter implements LogWriter {
      write(message: string) {
        totalQueries += 1
        const loggingParams: Record<string, any> = {
          component: 'drizzle',
          totalQueries,
        }
        if (logLevel === 'debug') {
          const queryHash = crypto.createHash('md5').update(message).digest('hex')
          individualQueriesCounter[queryHash] = (individualQueriesCounter[queryHash] || 0) + 1
          loggingParams.totalSameQuery = individualQueriesCounter[queryHash]
        }
        logger.child(loggingParams).debug(message)
      }
    }
    const logWriter = new DefaultLogger({ writer: new DrizzleLogWriter() })
    _db = drizzle(_pool, { schema, logger: logWriter })
  }

  const migration = async () => {
    const {
      database: { migrationsFolder },
    } = useEnv()
    // check if migration folder exists
    if (!existsSync(migrationsFolder)) {
      await fs.mkdir(migrationsFolder, { recursive: true })
    }
    await migrate(_db, {
      migrationsFolder,
    })
  }

  return { connect, db: _db, migration }
}

export default useDrizzle
