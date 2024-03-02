import { format } from 'date-fns'

export const formatDate = (date?: string | Date, withTime = false) => {
  if (!date) return ''
  if (withTime) return format(new Date(date), 'dd.MM.yyyy HH:mm')
  return format(new Date(date), 'dd.MM.yyyy')
}
