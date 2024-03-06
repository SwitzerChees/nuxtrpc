import { type User } from '~/types'

export const useMyUser = <T = User>(): Ref<T> => useState<T>('my_user')
