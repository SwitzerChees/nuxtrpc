import type { UserSelect } from '~/server/database/schema'

export type User = Omit<UserSelect, 'password'>
