import { existsSync, promises as fs } from 'fs'
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
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
    _db = drizzle(_pool, { schema })
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
