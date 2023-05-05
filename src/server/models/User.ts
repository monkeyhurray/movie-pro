import mongoose from "mongoose";

interface DBUser {
  id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  gender: string;
}

const userSchema = new mongoose.Schema<DBUser>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
