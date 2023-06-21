import express, { Router, Request, Response } from "express";
import { requireLogin, alreadyLoggedInUser } from "./middlewares";
import {
  postSignUp,
  logOut,
  postLogin,
  getLogin,
  getSignUp,
} from "../controllers/userController";

const path = require("path");

const userRouter: Router = express.Router();
const staticPath = path.join(__dirname, "../../client/build");

userRouter.use(express.static(staticPath));

const userRoot = (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
};

userRouter.route("/login").get(userRoot, alreadyLoggedInUser).post(postLogin);
userRouter.route("/signUp").get(userRoot).post(postSignUp);
userRouter.route("/myPage").all(requireLogin).get(userRoot);

export default userRouter;
