import mongoose from "mongoose";
interface Video {
  title: string;
}
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 80 },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
