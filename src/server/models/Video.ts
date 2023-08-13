import mongoose, { Document } from "mongoose";

interface DBVideo extends Document {
  title: string;
  videoUrl: string;
  genre: string;
  actors: string;
  owner: mongoose.Types.ObjectId;
  introduce: string;
}
const videoSchema = new mongoose.Schema<DBVideo>({
  title: { type: String, required: true, maxLength: 80 },
  videoUrl: { type: String, required: true },
  genre: { type: String },
  actors: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  introduce: { type: String },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
