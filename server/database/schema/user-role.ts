import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { roleTable, userTable } from '.'

export const userRoleTable = pgTable('user_roles', {
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roleTable.id),
})
export const userRolesRelations = relations(userRoleTable, ({ one }) => ({
  user: one(userTable, { fields: [userRoleTable.userId], references: [userTable.id] }),
  role: one(roleTable, { fields: [userRoleTable.roleId], references: [roleTable.id] }),
}))
export type UserRoleSelect = InferSelectModel<typeof userRoleTable>
export type UserRoleInsert = InferInsertModel<typeof userRoleTable>
