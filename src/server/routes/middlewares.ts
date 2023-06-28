import { Request, Response, NextFunction } from "express";
import { Session, SessionData } from "express-session";
import User, { DBUser } from "../models/User";
import multer from "multer";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { RequestHandler } from "express";

export const confirmUser: RequestHandler = async (req, res) => {};
export const beforeLogin: RequestHandler = (req, res, next) => {
  try {
    if (!req.session.loggedIn) {
      next();
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

export const requireLogin: RequestHandler = async (req, res, next) => {
  try {
    if (req.session && req.session.loggedIn) {
      const userId = req.session.user;
      const user = await User.findById(userId);

      if (user) {
        req.session.user = user;
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
  next();
};

export const SomeProtectedRoute: RequestHandler = (req, res, next) => {
  const sessionData = req.session;

  if (sessionData.user) {
    // 로그인된 사용자라면 다음 미들웨어 또는 핸들러로 이동
    next();
  } else {
    // 로그인되지 않은 사용자라면 로그인 페이지로 리디렉션
    res.redirect("/login");
  }
};

export const alreadyLoggedInUser: RequestHandler = async (
  req,
  res,
  next
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

export const thumbUpload = multer({
  dest: "uploads/thumb/",
  limits: {
    fileSize: 3000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
});
