import { useDrizzle } from '../utils/drizzle'

export default defineNitroPlugin(async () => {
  const { connect, migration } = useDrizzle()
  await connect()
  await migration()
})
