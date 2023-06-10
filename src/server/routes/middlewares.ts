import { Request, Response, NextFunction } from "express";
import { Session, SessionData } from "express-session";
import User, { DBUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { secretKey } from "../server";

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

export const loginToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id, socialOnly: true });
    if (!user) {
      return res.redirect("/login");
    }

    const confirm = await bcrypt.compare(password, user.password);
    if (!confirm) {
      return res.redirect("/login");
    }

    // 토큰 생성 로직
    const payload = { userId: user._id };

    if (secretKey === null) {
      console.error("Secret key is not defined");
      return;
    }

    const token = jwt.sign(payload, secretKey);
    console.log(secretKey);
    // 토큰을 쿠키에 저장
    res.cookie("x_auth", token);
    next();
  } catch (error) {
    console.error("로그인 중 오류 발생");
    return res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
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
