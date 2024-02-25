import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { roleTable, userTable } from '.'

export const userRoleTable = pgTable('user_roles', {
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roleTable.id),
})
export type UserRoleSelect = InferSelectModel<typeof userRoleTable>
export type UserRoleInsert = InferInsertModel<typeof userRoleTable>
