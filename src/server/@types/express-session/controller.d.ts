import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    user: any;
  }
}
