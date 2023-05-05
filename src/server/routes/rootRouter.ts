import express, { Router } from "express";
const path = require("path");
const rootRouter: Router = express.Router();

rootRouter.get("/MasterPiece", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
//수정하기
export default rootRouter;
