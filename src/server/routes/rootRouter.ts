import express, { Router, Request, Response } from "express";
import path from "path";

import {
  postSignUp,
  logOut,
  postLogin,
  getLogin,
  getSignUp,
} from "../controllers/userController";

import { requireLogin } from "./middlewares";

const rootRouter: Router = express.Router();
const staticPath = path.join(__dirname, "../../client/build");

rootRouter.use(express.static(staticPath));

const realRoot = (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
};

rootRouter.get("/", realRoot);
rootRouter.get("/masterPiece", realRoot);
rootRouter.get("/latestMovie", realRoot);
rootRouter.route("/signUp").get(realRoot).post(postSignUp);
rootRouter.route("/login").get(realRoot).post(postLogin);
rootRouter.get("/community", requireLogin, realRoot);
rootRouter.get("/myPage", requireLogin, realRoot);
//수정하기
export default rootRouter;
