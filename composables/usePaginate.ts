type PaginateParams = {
  filter?: string
  offset?: number
  orderBy?: string
  orderByASC?: boolean
  limit?: number
}

export const usePaginate = <T extends PaginateParams>(input: T, execute: () => void) => {
  watch(
    () => input.filter,
    () => (input.offset = 0),
  )
  watch([() => input.orderBy, () => input.orderByASC], () => {
    input.offset = 0
    execute()
  })
  const paginate = (e: { page: number; rows: number }) => {
    input.offset = e.page * e.rows
    input.limit = e.rows
    execute()
  }
  return { paginate }
}
