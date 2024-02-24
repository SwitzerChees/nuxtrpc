import { text, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { InferSelectModel, relations } from 'drizzle-orm'

// User Table
export const userTable = pgTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
})
export const usersRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable),
}))
export type UserSelect = InferSelectModel<typeof userTable>
export type UserInsert = InferSelectModel<typeof userTable>

// Post Table
export const postTable = pgTable('posts', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  authorId: text('author_id').notNull(),
})
export const postsRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, { fields: [postTable.authorId], references: [userTable.id] }),
}))
export type PostSelect = InferSelectModel<typeof postTable>
export type PostInsert = InferSelectModel<typeof postTable>

// Session Table
export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})
export type SessionSelect = InferSelectModel<typeof sessionTable>
export type SessionInsert = InferSelectModel<typeof sessionTable>
