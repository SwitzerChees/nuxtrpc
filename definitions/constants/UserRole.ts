export const UserRoles = {
  Admin: 'admin',
  Manager: 'manager',
  Marketing: 'marketing',
} as const

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]
