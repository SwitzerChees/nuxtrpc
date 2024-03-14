export const UserRoles = {
  Admin: 'admin',
} as const

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]
