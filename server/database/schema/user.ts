import { text, pgTable, uuid } from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel, relations, sql } from 'drizzle-orm'
import { postTable, sessionTable, userRoleTable } from '.'

export const userTable = pgTable('users', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
})
export const usersRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable),
  sessions: many(sessionTable),
  userRoles: many(userRoleTable),
}))
export type UserSelect = InferSelectModel<typeof userTable>
export type UserInsert = InferInsertModel<typeof userTable>
