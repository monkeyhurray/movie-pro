import express, { Router } from "express";
import {
  getUpload,
  postUpload,
  getWatch,
  getSee,
} from "../controllers/videoController";
import { videoUpload } from "./middlewares";

const videoRouter: Router = express.Router();
videoRouter.route("/").get(getWatch);

videoRouter.route("/:id").get(getSee);

videoRouter
  .route("/upload")
  .get(getUpload)
  .post(videoUpload.single("videoFile"), postUpload);

//수정하기
export default videoRouter;
