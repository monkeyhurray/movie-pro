import express, { Router } from "express";
import { requireLogin } from "./middlewares";
const path = require("path");
const rootRouter: Router = express.Router();

rootRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
});

rootRouter.get("/masterPiece", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});
rootRouter.get("/latestMovie", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});
rootRouter.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});
rootRouter.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});
rootRouter.get("/community", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});
rootRouter.get("/myPage", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});
//수정하기
export default rootRouter;
