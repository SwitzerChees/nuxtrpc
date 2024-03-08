export default defineEventHandler(async (event) => {
  const { db } = useDrizzle()
  event.context.db = db
  const { getUserSession, refreshUserSession } = useUserSession()
  const { session, user } = await getUserSession(event)
  event.context.user = user
  event.context.session = session
  await refreshUserSession(event)
})
