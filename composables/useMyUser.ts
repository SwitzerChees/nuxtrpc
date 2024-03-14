import { type User } from '~/definitions'

export const useMyUser = <T = User>(): Ref<T> => useState<T>('my_user')
