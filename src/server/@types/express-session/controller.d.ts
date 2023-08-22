import { SessionData } from "express-session";
import { Types } from "mongoose";

interface MongoUser {
  _id: Types.ObjectId;
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
}

interface UserId {
  _id: Types.ObjectId;
}

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    user: MongoUser;
    userId: UserId;
  }
}
