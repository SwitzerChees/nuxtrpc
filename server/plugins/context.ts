import { H3Event } from 'h3'

export default defineNitroPlugin(async (nitroApp) => {
  const { connect } = useDrizzle()
  await connect()
  const { db } = useDrizzle()
  // await migration()
  nitroApp.hooks.hook('request', async (event: H3Event) => {
    event.context.db = db
    const { getUserSession, refreshUserSession } = useUserSession()
    const { session, user } = await getUserSession(event)
    event.context.user = user
    event.context.session = session
    await refreshUserSession(event)
  })
})
