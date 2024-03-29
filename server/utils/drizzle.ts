import { existsSync, promises as fs } from 'fs'
import crypto from 'crypto'
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { DefaultLogger, type LogWriter } from 'drizzle-orm'
import pg from 'pg'
import * as schema from '~/server/database/schema'

let _pool: pg.Pool
let _db: NodePgDatabase<typeof schema> | undefined

const connect = async () => {
  if (!_pool) {
    const { database } = env.config()
    // eslint-disable-next-line import/no-named-as-default-member
    _pool = new pg.Pool(database)
  }
  await _pool.connect()
  const logger = logging.logger()
  const { logLevel } = env.config()
  let totalQueries = 0
  const individualQueriesCounter: Record<string, number> = {}
  class DrizzleLogWriter implements LogWriter {
    write(message: string) {
      totalQueries += 1
      const loggingParams: Record<string, any> = {
        component: 'drizzle',
        totalQueries,
      }
      const shortQuery = message?.includes('from')
        ? `${message.split('from')[0].trimEnd()} from ${message.split('from')[1].split(' ')[1]}`
        : message
      if (logLevel === 'debug') {
        const queryHash = crypto.createHash('md5').update(shortQuery).digest('hex')
        individualQueriesCounter[queryHash] = (individualQueriesCounter[queryHash] || 0) + 1
        loggingParams.totalSameQuery = individualQueriesCounter[queryHash]
      }
      logger.child(loggingParams).debug(shortQuery)
    }
  }
  const logWriter = new DefaultLogger({ writer: new DrizzleLogWriter() })
  _db = drizzle(_pool, { schema, logger: logWriter })
}

const migration = async () => {
  if (!_db) throw new Error('Database not connected')
  const {
    database: { migrationsFolder },
  } = env.config()
  // check if migration folder exists
  if (!existsSync(migrationsFolder)) {
    await fs.mkdir(migrationsFolder, { recursive: true })
  }
  await migrate(_db, {
    migrationsFolder,
  })
}

const getDB = () => {
  if (!_db) throw new Error('Database not connected')
  return _db
}

export default { connect, getDB, migration }
