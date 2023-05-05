import express, { Express, Request, Response } from "express";
import rootRouter from "./routes/rootRouter";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
//수정하기
export default app;
