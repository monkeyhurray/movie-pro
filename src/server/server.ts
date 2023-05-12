import express, { Express, Request, Response } from "express";
import rootRouter from "./routes/rootRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import User from "./models/User";
import { postSignUp } from "./controllers/userController";
require("dotenv").config();
const path = require("path");

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

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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
app.post("/SignUp", postSignUp, (req: Request, res: Response): void => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(200).json({
        sucess: true,
      });
      res.redirect("/Login");
    })
    .catch((error: Error) => {
      console.error(error);
      res.redirect("/SignUp");
    });
});
//수정하기

export default app;
