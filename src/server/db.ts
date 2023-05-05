import mongoose from "mongoose";
require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("MONGO_URL not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUrl)
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));

//현재는 로컬용 배포시 바꿔야할 수도 있음
