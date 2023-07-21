import express, { Express } from "express";
import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { localsMiddleware } from "./routes/middlewares";

require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

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
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: sessionId,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl }),
    cookie: {
      maxAge: 3600000,
      secure: false,
    },
  })
);
//app.use(localsMiddleware);
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

//수정하기
export default app;
