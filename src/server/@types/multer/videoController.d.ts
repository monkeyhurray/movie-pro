import { Request } from "express-serve-static-core";
import { SessionData } from "express-session";
import { File } from "multer";

interface MongoVideo {
  _id: Types.ObjectId;
  title: string;
  videoUrl: string;
  genre: string;
  actors: string;
  owner: Types.ObjectId;
}

interface VideoId {
  _id: Types.ObjectId;
}

declare module "express-serve-static-core" {
  interface Request {
    file: File;
  }
}

declare module "express-session" {
  interface SessionData {
    videoId: VideoId;
    video: MongoVideo;
    videoUrl: string;
  }
}
