import { Session } from 'express-session'

declare module 'express-session' {
 interface Session {
    userId: string | null;
    token: string | null;
    _csrf: string | null;
  }
}
