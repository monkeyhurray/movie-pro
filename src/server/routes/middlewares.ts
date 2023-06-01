import { Request, Response, NextFunction } from "express";
import { Session, SessionData } from "express-session";
import User, { DBUser } from "../models/User";

interface ExtendedRequest extends Request {
  session: Session &
    Partial<SessionData> & { userId?: string; loggedIn?: boolean };
  currentUser?: DBUser;
}
interface CustomSessionData extends Session {
  user?: string;
}
export const requireLogin = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.session.loggedIn) {
      const userId = req.session.userId;
      const user = await User.findById(userId);

      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect("/login");
      }
    } else {
      if (req.originalUrl === "/login") {
        next();
      } else {
        res.redirect("/login");
      }
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

export const SomeProtectedRoute = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const sessionData = req.session as CustomSessionData;

  if (sessionData.user) {
    // 로그인된 사용자라면 다음 미들웨어 또는 핸들러로 이동
    next();
  } else {
    // 로그인되지 않은 사용자라면 로그인 페이지로 리디렉션
    res.redirect("/login");
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
