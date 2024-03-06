import { existsSync, promises as fs } from 'fs'
import crypto from 'crypto'
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { DefaultLogger, LogWriter } from 'drizzle-orm'
import pg from 'pg'
import * as schema from '~/server/database/schema'

let _pool: pg.Pool
let _db: NodePgDatabase<typeof schema>

const useDrizzle = () => {
  if (!_pool) {
    // eslint-disable-next-line import/no-named-as-default-member
    _pool = new pg.Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '10432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'test123',
      database: process.env.DB || 'app',
    })
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
    const migrationsFolder = process.env.DB_MIGRATIONS_FOLDER || 'server/database/migrations'
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
