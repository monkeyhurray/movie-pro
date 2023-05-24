import { Request, Response, NextFunction } from "express";
import { Session, SessionData } from "express-session";
import User, { DBUser } from "../models/User";

interface ExtendedRequest extends Request {
  session: Session &
    Partial<SessionData> & { userId?: string; loggedIn?: boolean };
  currentUser?: DBUser;
}

export const requireLogin = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.session && req.session.loggedIn) {
      const userId = req.session.userId;
      const user = await User.findById(userId);

      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect("/Login");
      }
    } else {
      if (req.originalUrl === "/Login") {
        next();
      } else {
        res.redirect("/Login");
      }
    }
  } catch (error) {
    console.error(error);
    res.redirect("/Login");
  }
};

export const alreadyLoggedInUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.session && req.session.loggedIn) {
      res.redirect("/");
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
