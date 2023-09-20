import express, { Router } from "express";
import {
  getUpload,
  postUpload,
  getMovie,
  getSee,
} from "../controllers/videoController";
import { videoUpload } from "./middlewares";

const videoRouter: Router = express.Router();

videoRouter.route("/movie").get(getMovie);

videoRouter.route("/movie/:id([0-9a-f]{24})").get(getSee);

videoRouter
  .route("/upload")
  .get(getUpload)
  .post(videoUpload.single("videoFile"), postUpload);

//수정하기
export default videoRouter;
