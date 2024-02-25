import { generateId } from 'lucia'

export const generateUUID = (length = 32) => {
  return generateId(length)
}
