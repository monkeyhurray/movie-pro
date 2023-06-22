import mongoose from "mongoose";

interface DBVideo {
  title: string;
  fileUrl: string;
  thumbUrl: string;
}
const videoSchema = new mongoose.Schema<DBVideo>({
  title: { type: String, required: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
