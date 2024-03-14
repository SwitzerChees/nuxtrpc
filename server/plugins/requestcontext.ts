export default defineNitroPlugin(async (nitroApp) => {
  await drizzle.connect()
  const db = drizzle.getDB()
  // await migration()
  nitroApp.hooks.hook('request', async (event: H3Event) => {
    event.context.db = db
    const { session, user } = await usersession.get(event)
    event.context.user = user
    event.context.session = session
    await usersession.refresh(event)
  })
})
