import { text, pgTable, uuid } from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel, relations, sql } from 'drizzle-orm'
import { userTable } from '.'

export const roleTable = pgTable('roles', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text('name').notNull().unique(),
})
export const rolesRelations = relations(roleTable, ({ many }) => ({
  users: many(userTable),
}))
export type RoleSelect = InferSelectModel<typeof roleTable>
export type RoleInsert = InferInsertModel<typeof roleTable>
