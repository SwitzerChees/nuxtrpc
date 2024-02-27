export default defineEventHandler(async (event) => {
  const { getUserSession } = useLucia()
  const { user, session } = await getUserSession(event)
  event.context.user = user
  event.context.session = session
})