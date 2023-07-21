import express, { Router } from "express";
import { postUpload, getSee, getMovie } from "../controllers/videoController";
import { videoUpload } from "./middlewares";

const videoRouter: Router = express.Router();
videoRouter.route("/movie").get(getMovie);
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
