import express, { Router, Request, Response } from "express";
import path from "path";
import multer from "multer";

import {} from "../controllers/videoController";
import {} from "./middlewares";

const videoRouter: Router = express.Router();
const staticPath = path.join(__dirname, "../../client/build");
const multerVideo = multer({ dest: "./uploads/videos" });

videoRouter.use(express.static(staticPath));

const videoRoot = (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
};
videoRouter.route("/").get(videoRoot).post();
//수정하기
export default videoRouter;
