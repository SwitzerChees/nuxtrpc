import { H3Event } from 'h3'

const useAuth = () => {
  const getUserSession = async (event: H3Event) => {
    const sessionToken = getCookie(event, 'session')
    if (!sessionToken) return undefined
    const { db } = useDrizzle()
    const session = await db.query.sessionTable.findFirst({
      where: (session, { eq }) => eq(session.id, sessionToken),
      with: {
        user: true,
      },
    })
    if (!session) return undefined
  }
}
export default useAuth
