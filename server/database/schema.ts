import { text, pgTable, timestamp, pgEnum, uuid } from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel, relations, sql } from 'drizzle-orm'

// User Table
export const userTable = pgTable('users', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
})
export const usersRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable),
  roles: many(roleTable),
}))
export type UserSelect = InferSelectModel<typeof userTable>
export type UserInsert = InferInsertModel<typeof userTable>

// Session Table
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
export type SessionSelect = InferSelectModel<typeof sessionTable>
export type SessionInsert = InferInsertModel<typeof sessionTable>

// Role Table
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

// User Role Table
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

// Permission Table
export const rights = pgEnum('right', ['read', 'write'])
export const permissionTable = pgTable('permissions', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text('name').notNull().unique(),
  right: rights('right').notNull(),
})
export const permissionsRelations = relations(permissionTable, ({ many }) => ({
  roles: many(roleTable),
}))
export type PermissionSelect = InferSelectModel<typeof permissionTable>
export type PermissionInsert = InferInsertModel<typeof permissionTable>

// Role Permission Table
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

// Post Table
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
