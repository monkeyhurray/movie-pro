import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface DBUser {
  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<DBUser>({
  id: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
