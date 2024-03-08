import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel, relations, sql } from 'drizzle-orm'
import { rolePermissionTable } from '.'

export const rights = pgEnum('right', ['read', 'write'])
export const permissionTable = pgTable('permissions', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text('name').notNull().unique(),
  right: rights('right').notNull(),
})
export const permissionsRelations = relations(permissionTable, ({ many }) => ({
  rolePermissions: many(rolePermissionTable),
}))
export type PermissionSelect = InferSelectModel<typeof permissionTable>
export type PermissionInsert = InferInsertModel<typeof permissionTable>
