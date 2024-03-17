import { text, pgTable, uuid } from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel, sql } from 'drizzle-orm'

export const fileTable = pgTable('files', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
  hash: text('hash').notNull(),
  type: text('type').notNull(),
})

export type FileSelect = InferSelectModel<typeof fileTable>
export type FileInsert = InferInsertModel<typeof fileTable>
