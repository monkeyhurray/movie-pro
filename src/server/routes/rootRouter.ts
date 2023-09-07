import express, { Router } from "express";

import {
  postLogin,
  getLogin,
  getSignUp,
  postSignUp,
} from "../controllers/userController";
import { getVideoOwner } from "../controllers/videoController";
import { userThumbUpload } from "./middlewares";
const rootRouter: Router = express.Router();

rootRouter.route("/").get(getVideoOwner);

rootRouter.route("/login").get(getLogin).post(postLogin);

rootRouter
  .route("/signUp")
  .get(getSignUp)
  .post(userThumbUpload.single("userThumb"), postSignUp);

export default rootRouter;
