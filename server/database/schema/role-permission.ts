import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { permissionTable, roleTable } from '.'

export const rolePermissionTable = pgTable('role_permissions', {
  roleId: uuid('role_id')
    .notNull()
    .references(() => roleTable.id),
  permissionId: uuid('permission_id')
    .notNull()
    .references(() => permissionTable.id),
})
export type RolePermissionSelect = InferSelectModel<typeof rolePermissionTable>
export type RolePermissionInsert = InferInsertModel<typeof rolePermissionTable>
