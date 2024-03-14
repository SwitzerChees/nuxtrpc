export default defineNitroPlugin(async (nitroApp) => {
  const { connect } = useDrizzle()
  await connect()
  const { db } = useDrizzle()
  // await migration()
  nitroApp.hooks.hook('request', async (event: H3Event) => {
    event.context.db = db
    const { session, user } = await usersession.get(event)
    event.context.user = user
    event.context.session = session
    await usersession.refresh(event)
  })
})
