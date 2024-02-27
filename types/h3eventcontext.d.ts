import 'h3'
import type { Session, User } from 'lucia'

declare module 'h3' {
  interface H3EventContext {
    session: Session | undefined
    user: User | undefined
  }
}
