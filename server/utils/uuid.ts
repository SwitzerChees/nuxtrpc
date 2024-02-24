import { generateId } from 'lucia'

export const useUUID = () => {
  const generate = (length = 32) => {
    return generateId(length)
  }
  return { generate }
}
