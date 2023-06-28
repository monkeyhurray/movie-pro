import express, { Router, Request, Response } from "express";
import path from "path";

import { getMasterPiece, getLatestMovie } from "../controllers/userController";

import { requireLogin } from "./middlewares";

const rootRouter: Router = express.Router();

rootRouter.route("/");
rootRouter.route("/masterPiece").get(getMasterPiece);
rootRouter.route("/latestMovie").get(getLatestMovie);

//수정하기
export default rootRouter;
