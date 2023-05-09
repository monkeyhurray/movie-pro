import mongoose from "mongoose";

interface DBCommunity {
  title: string;
  content: string;
}

const communitySchema = new mongoose.Schema<DBCommunity>({
  title: { type: String, maxLength: 50, required: true },
  content: { type: String, required: true },
});

const Community = mongoose.model("Community", communitySchema);

export default Community;
