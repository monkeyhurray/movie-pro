import express, { Router } from "express";

import {
  getMasterPiece,
  getLatestMovie,
  postLogin,
  getLogin,
  getSignUp,
  postSignUp,
} from "../controllers/userController";
import { beforeLogin } from "./middlewares";
const rootRouter: Router = express.Router();

rootRouter.route("/masterPiece").get(getMasterPiece);
rootRouter.route("/latestMovie").get(getLatestMovie);

rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/signUp").get(getSignUp).post(postSignUp);

export default rootRouter;
