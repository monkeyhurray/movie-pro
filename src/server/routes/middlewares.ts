import multer from "multer";
import { RequestHandler } from "express";
//로그인전 유저
//로그인한 유저

export const localsMiddleware: RequestHandler = (req, res, next) => {
  req.session.loggedIn = Boolean(req.session.loggedIn);
  req.session.userId = req.session.userId || null;
  next();
};

export const beforeLogin: RequestHandler = (req, res, next) => {
  if (req.session.loggedIn === false || req.session.loggedIn === undefined) {
    next();
  }
  res.redirect("/");
};

export const afterLogin: RequestHandler = async (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const thumbUpload = multer({
  dest: "src/client/public/uploads/thumb/",
  limits: {
    fileSize: 3000000,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/client/public/uploads/videos/");
  },
});

export const videoUpload = multer({ storage });
