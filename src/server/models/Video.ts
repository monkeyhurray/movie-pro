import mongoose from "mongoose";
interface DBVideo {
  title: string;
  fileUrl: string;
  thumbUrl: string;
  views: number;
}
const videoSchema = new mongoose.Schema<DBVideo>({
  title: { type: String, required: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String },
  views: { type: Number, default: 0, required: true },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
