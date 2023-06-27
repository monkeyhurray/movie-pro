import express, { Router, Request, Response } from "express";
import path from "path";

import { postUpload, getSee } from "../controllers/videoController";
import { videoUpload, requireLogin, SomeProtectedRoute } from "./middlewares";

const videoRouter: Router = express.Router();
const staticPath = path.join(__dirname, "../../client/build");

videoRouter.use(express.static(staticPath));

const videoRoot = (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
};

videoRouter.route("/:id([0-9a-f]{24})").get(videoRoot).get(getSee);

videoRouter
  .route("/upload")
  .get(videoRoot)
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    postUpload
  );

//수정하기
export default videoRouter;
