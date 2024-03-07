import { text, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel, relations } from 'drizzle-orm'
import { userTable } from '.'

export const sessionTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})
export const sessionsRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, { fields: [sessionTable.userId], references: [userTable.id] }),
}))
export type SessionSelect = InferSelectModel<typeof sessionTable>
export type SessionInsert = InferInsertModel<typeof sessionTable>
