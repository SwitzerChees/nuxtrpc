export default defineEventHandler(async (event) => {
  const { db } = useDrizzle()
  event.context.db = db
  const { getUserSession } = useUserSession()
  const { session, user } = await getUserSession(event)
  event.context.user = user
  event.context.session = session
})
