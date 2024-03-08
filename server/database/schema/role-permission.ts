import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { permissionTable, roleTable } from '.'

export const rolePermissionTable = pgTable('role_permissions', {
  roleId: uuid('role_id')
    .notNull()
    .references(() => roleTable.id),
  permissionId: uuid('permission_id')
    .notNull()
    .references(() => permissionTable.id),
})
export const rolePermissionsRelations = relations(rolePermissionTable, ({ one }) => ({
  role: one(roleTable, { fields: [rolePermissionTable.roleId], references: [roleTable.id] }),
  permission: one(permissionTable, { fields: [rolePermissionTable.permissionId], references: [permissionTable.id] }),
}))
export type RolePermissionSelect = InferSelectModel<typeof rolePermissionTable>
export type RolePermissionInsert = InferInsertModel<typeof rolePermissionTable>
