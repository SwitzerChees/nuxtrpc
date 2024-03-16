export type FormatedError = {
  message: string
  details?: string
  issues?: {
    code: string
    minimum: number
    path: string[]
  }[]
}
