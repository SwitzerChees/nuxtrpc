import { text, pgTable, uuid } from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel, relations, sql } from 'drizzle-orm'
import { userTable } from '.'

export const postTable = pgTable('posts', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  content: text('content').notNull(),
  authorId: uuid('author_id').notNull(),
})
export const postsRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, { fields: [postTable.authorId], references: [userTable.id] }),
}))
export type PostSelect = InferSelectModel<typeof postTable>
export type PostInsert = InferInsertModel<typeof postTable>
