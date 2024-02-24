import { useDrizzle } from '../utils/drizzle'

export default defineNitroPlugin(async () => {
  const { connect } = useDrizzle()
  await connect()
  const { db } = useDrizzle()
  const { initialize } = useLucia()
  initialize(db)
  // await migration()
})
