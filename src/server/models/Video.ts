import mongoose, { Document } from "mongoose";

interface DBVideo extends Document {
  title: string;
  videoContent: string;
  thumb: string;
  owner: mongoose.Types.ObjectId;
}
const videoSchema = new mongoose.Schema<DBVideo>({
  title: { type: String, required: true, maxLength: 80 },
  videoContent: { type: String, required: true },
  thumb: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
