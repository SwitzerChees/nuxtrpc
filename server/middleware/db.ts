export default defineEventHandler((event) => {
  const { db } = useDrizzle()
  event.context.db = db
})
