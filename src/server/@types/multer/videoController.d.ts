import { Request } from "express-serve-static-core";
import { File } from "multer";

declare module "express-serve-static-core" {
  interface Request {
    file: File;
  }
}
