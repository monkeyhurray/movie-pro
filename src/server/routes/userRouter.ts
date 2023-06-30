import express, { Router, Request, Response } from "express";
import { requireLogin, alreadyLoggedInUser, beforeLogin } from "./middlewares";
import {
  postSignUp,
  postLogin,
  getLogin,
  getSignUp,
  logOut,
} from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.route("/signUp").get(getSignUp).post(postSignUp);

userRouter
  .route("/login")
  .all(beforeLogin)
  .get(alreadyLoggedInUser, getLogin)
  .post(postLogin);

userRouter.route("/myPage").all(requireLogin);

export default userRouter;
