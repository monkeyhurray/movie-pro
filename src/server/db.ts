import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));

//현재는 로컬용 배포시 바꿔야할 수도 있음
