import express, { Express, Request, Response } from "express";
import rootRouter from "./routes/rootRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;
const sessionId = process.env.SESSION_ID;

if (!mongoUrl) {
  console.error("MONGO_URL not set in environment variables");
  process.exit(1);
}

if (!sessionId) {
  console.error("SESSION_ID not set in environment variables");
  process.exit(1);
}

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionId,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoUrl }),
  })
);

app.use("/", rootRouter);
//수정하기

export default app;
