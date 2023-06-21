import express, { Router, Request, Response } from "express";
import path from "path";

import {} from "../controllers/userController";

import { requireLogin } from "./middlewares";

const rootRouter: Router = express.Router();
const staticPath = path.join(__dirname, "../../client/build");

rootRouter.use(express.static(staticPath));

const realRoot = (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
};

rootRouter.route("/").get(realRoot);
rootRouter.route("/masterPiece").get(realRoot);
rootRouter.route("/latestMovie").get(realRoot);

//수정하기
export default rootRouter;
