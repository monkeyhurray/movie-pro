import express, { Router } from "express";
import { afterLogin } from "./middlewares";
import { getMyPage, logOut } from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.route("/myPage").all(afterLogin).get(getMyPage);
userRouter.get("/logOut", logOut);

export default userRouter;
