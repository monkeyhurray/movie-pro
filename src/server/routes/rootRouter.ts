import express, { Router } from "express";

import {
  postLogin,
  getLogin,
  getSignUp,
  postSignUp,
} from "../controllers/userController";
import { getVideoOwner, getMovie } from "../controllers/videoController";
const rootRouter: Router = express.Router();

rootRouter.route("/").get(getVideoOwner);

rootRouter.route("/movie").get(getMovie);

rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/signUp").get(getSignUp).post(postSignUp);

export default rootRouter;
