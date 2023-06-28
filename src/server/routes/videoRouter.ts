import express, { Router, Request, Response } from "express";
import path from "path";

import { postUpload, getSee } from "../controllers/videoController";
import { videoUpload, requireLogin, SomeProtectedRoute } from "./middlewares";

const videoRouter: Router = express.Router();

videoRouter.route("/:id([0-9a-f]{24})").get(getSee);

videoRouter.route("/upload").post(
  videoUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumb", maxCount: 1 },
  ]),
  postUpload
);

//수정하기
export default videoRouter;
